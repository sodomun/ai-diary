import HolidayJp from "@holiday-jp/holiday_jp";
import { Diary } from "../types";

type Props = {
  year: number;
  month: number;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  diaries?: Diary[];
};

type Cell = {
  date: Date;
  isCurrent: boolean;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Calendar({ year, month, selectedDate, onSelectDate, diaries = [] }: Props) {
  const diaryDateSet = new Set(
    diaries.map((d) => new Date(d.createdAt).toDateString())
  );
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;

  const today = new Date();

  const cells: Cell[] = [];

  // 前月の日付で先頭を埋める
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({
      date: new Date(prevYear, prevMonth - 1, daysInPrevMonth - i),
      isCurrent: false,
    });
  }

  // 当月の日付
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month - 1, d), isCurrent: true });
  }

  // 次月の日付で末尾を埋める
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({
      date: new Date(nextYear, nextMonth - 1, nextDay++),
      isCurrent: false,
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((weekday, i) => (
          <div
            key={weekday}
            className={`text-center text-sm font-semibold py-2 ${
              i === 0
                ? "text-red-500"
                : i === 6
                ? "text-blue-500"
                : "text-zinc-500 dark:text-zinc-400"
            }`}
          >
            {weekday}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7">
        {cells.map(({ date, isCurrent }, idx) => {
          const col = idx % 7;
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, selectedDate);
          const isDiaryDate = isCurrent && diaryDateSet.has(date.toDateString());

          const isHoliday = HolidayJp.isHoliday(date);

          const colorClass = isSelected
            ? "bg-blue-500 text-white font-bold"
            : isToday
            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold"
            : col === 0 || isHoliday
            ? "text-red-500"
            : col === 6
            ? "text-blue-500"
            : "text-zinc-800 dark:text-zinc-100";

          const diaryHighlight =
            isDiaryDate && !isSelected && !isToday
              ? "bg-gray-200 dark:bg-zinc-700"
              : "";

          return (
            <div
              key={idx}
              className="h-12 flex items-center justify-center"
            >
              <button
                onClick={() => onSelectDate(date)}
                className={`text-sm w-8 h-8 flex items-center justify-center rounded-full cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all ${colorClass} ${diaryHighlight} ${
                  !isCurrent ? "opacity-30" : ""
                }`}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
