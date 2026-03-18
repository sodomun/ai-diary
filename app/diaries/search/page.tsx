"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DiaryList from "../../components/DiaryList";
import Footer from "../../components/Footer";
import { Diary } from "../../types";

export default function DiarySearchPage() {
  const [query, setQuery] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [filtered, setFiltered] = useState<Diary[]>([]);

  useEffect(() => {
    fetch("/api/diaries", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setDiaries(data);
      });
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFiltered([]);
      return;
    }
    const result = diaries.filter((diary) =>
      diary.content.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, diaries]);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto px-4 py-3 relative flex items-center">
          <Link
            href="/diaries"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            戻る
          </Link>
          <div className="flex flex-1 justify-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="日記を検索"
              className="w-2/3 px-3 py-1.5 text-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md text-zinc-700 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        {query.trim() === "" ? (
          <p className="text-center text-gray-400 mt-4">
            キーワードを入力してください
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">
            該当する日記が見つかりませんでした
          </p>
        ) : (
          <DiaryList diaries={filtered} query={query} />
        )}
      </main>
      <Footer />
    </div>
  );
}
