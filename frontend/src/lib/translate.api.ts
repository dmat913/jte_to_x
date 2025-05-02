/**
 * @param text 日本語のテキスト
 * @returns  英語のテキスト
 * @description 日本語のテキストを英語に翻訳するAPIを呼び出す関数
 */
export const translateText = async (originalJa: string): Promise<string> => {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
    body: JSON.stringify({ originalJa: originalJa }),
  });

  if (!res.ok) throw new Error("translate api error");

  const result = await res.json();
  return result.data.translatedEn;
};
