type Props = {
  year: number;
  month: number;
};

type Cell = {
  day: number;
  isCurrent: boolean;
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function Calendar({ year, month }: Props) {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const daysInPrevMonth = new Date(year, month - 1, 0).getDate();

  const today = new Date();

  const cells: Cell[] = [];

  // 前月の日付で先頭を埋める
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, isCurrent: false });
  }

  // 当月の日付
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, isCurrent: true });
  }

  // 次月の日付で末尾を埋める
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, isCurrent: false });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-4">
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
        {cells.map(({ day, isCurrent }, idx) => {
          const col = idx % 7;
          const isToday =
            isCurrent &&
            today.getFullYear() === year &&
            today.getMonth() + 1 === month &&
            today.getDate() === day;

          const colorClass = isToday
            ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold"
            : col === 0
            ? "text-red-500"
            : col === 6
            ? "text-blue-500"
            : "text-zinc-800 dark:text-zinc-100";

          return (
            <div
              key={idx}
              className="aspect-square flex items-center justify-center"
            >
              <span
                className={`text-sm w-8 h-8 flex items-center justify-center rounded-full ${colorClass} ${
                  !isCurrent ? "opacity-30" : ""
                }`}
              >
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
