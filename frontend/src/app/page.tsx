import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Link href="/translate" className="text-blue-500 hover:underline">
        翻訳ページへ
      </Link>
    </div>
  );
}
