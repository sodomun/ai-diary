import Link from "next/link";
import DiaryHeader from "../components/DiaryHeader";
import Footer from "../components/Footer";
import DiaryList from "../components/DiaryList";

export default function DiariesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <DiaryHeader />
      <main className="flex-1">
        <div className="max-w-3xl mx-auto w-full px-4 pt-6">
          <Link
            href="/diaries/new"
            className="inline-block text-center px-5 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            新規日記作成
          </Link>
        </div>
        <DiaryList />
      </main>
      <Footer />
    </div>
  );
}
