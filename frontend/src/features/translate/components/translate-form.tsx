"use client";
import { translateText } from "@/lib/translate.api";
import { useState } from "react";
import { RiTranslateAi2 } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
import { usePlaceholderAnimation } from "../hooks/usePlaceholderAnimation";
import { placeholders } from "../data/placeholders";
import { IoCopyOutline } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";
import { handleCopy } from "@/utils/clipboard";

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
      console.error("error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:gap-8 w-full flex-1 p-4">
      {translated ? (
        <div className="relative">
          <Typewriter words={[translated]} typeSpeed={70} delaySpeed={1000} />
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-start">
              <div className="w-3 h-3 bg-black rounded-full animate-bounce"></div>
            </div>
          ) : (
            <span className="font-semibold text-gray-700 text-2xl md:text-5xl">
              Enter your <span className="text-yellow-500">Japanese Text</span>{" "}
              to translate into <span className="text-yellow-500">English</span>{" "}
              for your Dairy Records!
            </span>
          )}
        </>
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
          className={`w-full h-12 outline-0 resize-none text-base transition-opacity duration-500 ${
            fade || !!originalText.length ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          <button
            type="button"
            disabled={!originalText.length}
            onClick={() => setOriginalText("")}
            className="p-2 border border-gray-200 rounded-full disabled:opacity-50"
          >
            <IoIosClose size={20} />
          </button>
          <button
            type="button"
            disabled={!translated}
            onClick={() => handleCopy(translated)}
            className="p-2 border border-gray-200 rounded-full disabled:opacity-50"
          >
            <IoCopyOutline size={20} />
          </button>
          <button
            type="submit"
            disabled={loading || originalText.length === 0}
            className="p-2 border border-yellow-200 rounded-full disabled:opacity-50 bg-yellow-500"
          >
            <RiTranslateAi2 size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default TranslateForm;
