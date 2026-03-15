import Link from "next/link";
import DiaryHeader from "../components/DiaryHeader";
import Footer from "../components/Footer";
import DiaryList from "../components/DiaryList";
import { Diary } from "../types";
import diariesData from "../../data/diary.json";

export default function DiariesPage() {
  const diaries = diariesData as Diary[];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <DiaryHeader />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto w-full px-4 pt-6">
          <Link
            href="/diaries/new"
            className="block w-full text-center py-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            新規日記作成
          </Link>
        </div>
        <DiaryList diaries={diaries} />
      </main>
      <Footer />
    </div>
  );
}
