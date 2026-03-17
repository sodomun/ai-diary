"use client";

type Props = {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
};

export default function CalendarHeader({ year, month, onPrev, onNext }: Props) {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onPrev}
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-left"
        >
          ＜
        </button>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {year}年{month}月
        </h1>
        <button
          onClick={onNext}
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-right"
        >
          ＞
        </button>
      </div>
    </header>
  );
}
