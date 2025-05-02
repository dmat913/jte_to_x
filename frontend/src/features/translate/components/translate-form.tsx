"use client";
import { translateText } from "@/lib/translate.api";
import { useState } from "react";
import { RiTranslateAi2 } from "react-icons/ri";
import { usePlaceholderAnimation } from "../hooks/usePlaceholderAnimation";
import { placeholders } from "../data/placeholders";
import { IoCopyOutline } from "react-icons/io5";

const TranslateForm = () => {
  // original text in Japanese
  const [originalText, setOriginalText] = useState("");
  // english text after translation
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState("");

  const { placeholder, fade } = usePlaceholderAnimation(placeholders);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTranslated("");
    // setError("");
    setLoading(true);

    try {
      const result = await translateText(originalText);
      setTranslated(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 md:gap-8">
      {translated ? (
        <div className="relative">
          <span className="font-semibold text-gray-700 text-2xl md:text-5xl">
            {translated}
          </span>
        </div>
      ) : (
        <span className="font-semibold text-gray-700 text-2xl md:text-5xl">
          Enter your <span className="text-yellow-500">Japanese Text</span> to
          translate into <span className="text-yellow-500">English</span> for
          your Dairy Records!
        </span>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full relative border border-gray-200 rounded-2xl px-4 pb-[52px] pt-4 shadow-md"
      >
        <textarea
          name="text"
          value={originalText}
          onChange={(e) => setOriginalText(e.target.value)}
          placeholder={placeholder}
          className={`w-full h-12 outline-0 resize-none text-sm transition-opacity duration-500 ${
            fade || !!originalText.length ? "opacity-100" : "opacity-0"
          }`}
        />
        <button
          disabled={!translated}
          onClick={() => {
            navigator.clipboard.writeText(translated);
          }}
          className="absolute bottom-2 right-16 p-2 border border-gray-200 rounded-full disabled:opacity-50"
        >
          <IoCopyOutline size={24} />
        </button>
        <button
          type="submit"
          disabled={loading}
          className="absolute bottom-2 right-2 p-2 border border-gray-200 rounded-full disabled:opacity-50"
        >
          <RiTranslateAi2 size={24} />
        </button>
      </form>
    </div>
  );
};

export default TranslateForm;
