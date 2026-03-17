"use client";

import { useState } from "react";
import CalendarHeader from "../components/CaldendarHeader";
import Calendar from "../components/Calendar";
import Footer from "../components/Footer";

export default function CalendarPage() {
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
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CalendarHeader year={year} month={month} onPrev={goPrev} onNext={goNext} />
      <main className="flex-1">
        <Calendar year={year} month={month} />
      </main>
      <Footer />
    </div>
  );
}
