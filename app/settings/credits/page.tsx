import Link from "next/link";
import Footer from "../../components/Footer";

export default function CreditsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/settings"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
          >
            ← 設定
          </Link>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">クレジット</h1>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-4">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-5">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wide mb-3">
            アイコン
          </p>
          <div className="flex flex-col gap-3">
            <div>
              <a
                href="https://icons8.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-semibold text-blue-500 hover:text-blue-600 transition-colors"
              >
                Icons by Icons8
              </a>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                本アプリで使用しているアイコンは Icons8 が提供するものです。
              </p>
            </div>
            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 flex flex-col gap-2">
              <a target="_blank" href="https://icons8.com/icon/123481/journal">日記</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
              <a target="_blank" href="https://icons8.com/icon/23/calendar">カレンダー</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
              <a target="_blank" href="https://icons8.com/icon/364/settings">設定</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
              <a target="_blank" href="https://icons8.com/icon/71201/edit-pencil">編集</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
              <a target="_blank" href="https://icons8.com/icon/11705/trash-can">ゴミ箱</a> アイコン by <a target="_blank" href="https://icons8.com">Icons8</a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
