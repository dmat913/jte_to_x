import TranslateForm from "@/features/translate/components/translate-form";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Translate - Japanese to English for your daily records",
    description:
      "Easily translate Japanese text into natural English for your daily records.",
    openGraph: {
      title: "Translate - Japanese to English for your daily records",
      description:
        "Easily translate Japanese text into natural English for your daily records.",
      url: "https://your-domain.com/translate",
      siteName: "Translate - Japanese to English for your daily records",
      // TODO: set Images url
      images: [
        {
          url: "https://your-domain.com/og-image.png",
          width: 1200,
          height: 630,
          alt: "Translate Japanese to English",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Translate - Japanese to English",
      description:
        "Easily translate Japanese text into natural English for your daily records.",
      // TODO: set Images
      images: ["https://your-domain.com/og-image.png"],
    },
  };
}

export default function TranslatePage() {
  return (
    <div className="p-4 h-screen relative overflow-hidden flex items-center justify-center">
      <TranslateForm />
      <ToastContainer />
    </div>
  );
}
