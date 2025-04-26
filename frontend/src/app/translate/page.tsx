"use client";

import { TRANSLATE } from "@/graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { useState } from "react";

// TODO: デザイン変更
export default function TranslatePage() {
  const [text, setText] = useState("");
  const [fetchTranslate, { data, loading, error }] = useLazyQuery(TRANSLATE);

  const handleTranslate = async () => {
    await fetchTranslate({
      variables: { text },
    });
  };

  return (
    <div className="p-4">
      <textarea
        className="border p-2 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="翻訳したいテキストを入力..."
      />
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        {loading ? "翻訳中..." : "翻訳する"}
      </button>

      {error && <p className="text-red-500 mt-2">エラーが発生しました</p>}

      {data && (
        <div className="mt-4 p-2 bg-gray-100">
          <h2 className="font-bold">翻訳結果：</h2>
          <p>{data.translate.translated}</p>
        </div>
      )}
    </div>
  );
}
