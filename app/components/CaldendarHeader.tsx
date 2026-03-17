"use client";

import { useState } from "react";

export default function CalendarHeader() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);

  const goPrev = () => {
    if (month === 1) {
      setYear((y) => y - 1);
      setMonth(12);
    } else {
      setMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (month === 12) {
      setYear((y) => y + 1);
      setMonth(1);
    } else {
      setMonth((m) => m + 1);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={goPrev}
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-left"
        >
          ＜
        </button>
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          {year}年{month}月
        </h1>
        <button
          onClick={goNext}
          className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-right"
        >
          ＞
        </button>
      </div>
    </header>
  );
}
