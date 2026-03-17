import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-700">
      <nav className="max-w-3xl mx-auto px-4 py-2 flex justify-around">
        <Link href="/diaries" className="flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          <Image src="/icons/diary.png" alt="diary" width={24} height={24} />
          日記
        </Link>
        <Link href="/calendar" className="flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          <Image src="/icons/calendar.png" alt="calendar" width={24} height={24} />
          カレンダー
        </Link>
        <Link href="/settings" className="flex-1 flex flex-col items-center gap-1 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          <Image src="/icons/settings.png" alt="settings" width={24} height={24} />
          設定
        </Link>
      </nav>
    </footer>
  );
}
