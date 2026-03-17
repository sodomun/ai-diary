"use client";

import { useState } from "react";
import CalendarHeader from "../components/CaldendarHeader";
import Calendar from "../components/Calendar";
import Footer from "../components/Footer";

export default function CalendarPage() {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
    // 前月・次月の日付をクリックした場合はその月へ遷移
    const clickedYear = date.getFullYear();
    const clickedMonth = date.getMonth() + 1;
    if (clickedYear !== year || clickedMonth !== month) {
      setYear(clickedYear);
      setMonth(clickedMonth);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CalendarHeader year={year} month={month} onPrev={goPrev} onNext={goNext} />
      <main className="flex-1">
        <Calendar
          year={year}
          month={month}
          selectedDate={selectedDate}
          onSelectDate={handleSelectDate}
        />
      </main>
      <Footer />
    </div>
  );
}
