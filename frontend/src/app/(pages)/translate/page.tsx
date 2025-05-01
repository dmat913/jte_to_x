"use client";

import { useState } from "react";

export default function TranslatePage() {
  const [text, setText] = useState("");
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTranslate = async () => {
    setLoading(true);
    setError("");
    setTranslated("");

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({ originalJa: text }),
      });

      if (!res.ok) {
        throw new Error("APIエラー");
      }

      const result = await res.json();
      setTranslated(result.data.translatedEn);
    } catch (err) {
      console.error(err);
      setError("翻訳に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <textarea
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="翻訳したいテキストを入力..."
        rows={4}
      />
      <button
        onClick={handleTranslate}
        disabled={loading || !text}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded disabled:opacity-50"
      >
        {loading ? "翻訳中..." : "翻訳する"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {translated && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">翻訳結果：</h2>
          <p>{translated}</p>
        </div>
      )}
    </div>
  );
}
