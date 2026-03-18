"use client";

import { useEffect, useState } from "react";
import CalendarHeader from "../components/CaldendarHeader";
import Calendar from "../components/Calendar";
import DiaryList from "../components/DiaryList";
import Footer from "../components/Footer";
import { Diary } from "../types";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [allDiaries, setAllDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetch("/api/diaries", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setAllDiaries(data));
  }, []);

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

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    const clickedYear = date.getFullYear();
    const clickedMonth = date.getMonth() + 1;
    if (clickedYear !== year || clickedMonth !== month) {
      setYear(clickedYear);
      setMonth(clickedMonth);
    }
  };

  const filteredDiaries = allDiaries.filter((diary) =>
    isSameDay(new Date(diary.createdAt), selectedDate)
  );

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CalendarHeader
          year={year}
          month={month}
          onPrev={goPrev}
          onNext={goNext}
          onChangeYearMonth={(y, m) => { setYear(y); setMonth(m); }}
        />
      <main className="flex-1">
        <Calendar
          year={year}
          month={month}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
          diaries={allDiaries}
        />
        <section className="max-w-3xl mx-auto px-4">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
              {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日の日記
            </h2>
            {filteredDiaries.length > 0 ? (
              <DiaryList diaries={filteredDiaries} />
            ) : (
              <p className="text-sm text-zinc-400 dark:text-zinc-500 py-4">
                この日の日記はありません
              </p>
            )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
