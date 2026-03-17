import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
      <nav className="max-w-3xl mx-auto px-4 py-3 flex justify-around">
        <Link href="/diaries" className="flex-1 text-center py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
            日記
        </Link>
        <Link href="/calendar" className="flex-1 text-center py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          カレンダー
        </Link>
        <Link href="/settings" className="flex-1 text-center py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          設定
        </Link>
      </nav>
    </footer>
  );
}
