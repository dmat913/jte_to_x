import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

const prisma = new PrismaClient();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { originalJa } = body;

    if (!originalJa) {
      return NextResponse.json(
        { error: "originalJa is required" },
        { status: 400 }
      );
    }

    // OpenAIで翻訳処理
    const chat = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 必要に応じてgpt-4に変更
      messages: [
        {
          role: "system",
          content:
            "あなたは優秀な英語翻訳者です。日本語を自然な英語に翻訳してください。よりネイティブに日常会話に近い形で翻訳してください。",
        },
        {
          role: "user",
          content: originalJa,
        },
      ],
    });

    const translatedEn = chat.choices[0].message.content?.trim() || "";

    // DBに保存
    const newTranslation = await prisma.translation.create({
      data: {
        originalJa,
        translatedEn,
      },
    });

    return NextResponse.json({ message: "success", data: newTranslation });
  } catch (error) {
    console.error("翻訳APIエラー:", error);
    return NextResponse.json({ error: "翻訳に失敗しました" }, { status: 500 });
  }
}
