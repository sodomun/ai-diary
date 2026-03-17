"use client";

import { useState } from "react";

type Props = {
  year: number;
  month: number;
  onPrev: () => void;
  onNext: () => void;
  onChangeYearMonth: (year: number, month: number) => void;
};

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function buildYearList(currentYear: number): number[] {
  const years: number[] = [];
  for (let y = currentYear - 5; y <= currentYear + 5; y++) years.push(y);
  return years;
}

export default function CalendarHeader({ year, month, onPrev, onNext, onChangeYearMonth }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempYear, setTempYear] = useState(year);
  const [tempMonth, setTempMonth] = useState(month);

  const openModal = () => {
    setTempYear(year);
    setTempMonth(month);
    setIsOpen(true);
  };

  const handleOk = () => {
    onChangeYearMonth(tempYear, tempMonth);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const years = buildYearList(year);

  return (
    <>
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={onPrev}
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-left"
          >
            ＜
          </button>
          <button
            onClick={openModal}
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {year}年{month}月
          </button>
          <button
            onClick={onNext}
            className="text-xl font-bold text-zinc-900 dark:text-zinc-50 w-10 text-right"
          >
            ＞
          </button>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={handleCancel}
        >
          <div
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl w-80 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ヘッダー */}
            <div className="px-6 pt-5 pb-3">
              <p className="text-base font-semibold text-zinc-700 dark:text-zinc-200">
                年月を選択
              </p>
              <p className="text-2xl font-bold text-blue-500 mt-1">
                {tempYear}年{tempMonth}月
              </p>
            </div>

            {/* 年・月 2列リスト */}
            <div className="flex border-t border-zinc-100 dark:border-zinc-800">
              {/* 年列 */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 text-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                  年
                </p>
                <div className="overflow-y-auto h-52 no-scrollbar">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setTempYear(y)}
                      className={`w-full py-2.5 text-sm font-medium transition-colors ${
                        y === tempYear
                          ? "bg-blue-500 text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-px bg-zinc-100 dark:bg-zinc-800" />

              {/* 月列 */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 text-center py-2 border-b border-zinc-100 dark:border-zinc-800">
                  月
                </p>
                <div className="overflow-y-auto h-52 no-scrollbar">
                  {MONTHS.map((m) => (
                    <button
                      key={m}
                      onClick={() => setTempMonth(m)}
                      className={`w-full py-2.5 text-sm font-medium transition-colors ${
                        m === tempMonth
                          ? "bg-blue-500 text-white"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* フッター */}
            <div className="flex border-t border-zinc-200 dark:border-zinc-700">
              <button
                onClick={handleCancel}
                className="flex-1 py-3.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                戻る
              </button>
              <div className="w-px bg-zinc-200 dark:bg-zinc-700" />
              <button
                onClick={handleOk}
                className="flex-1 py-3.5 text-sm font-semibold text-blue-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
