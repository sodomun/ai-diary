"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Diary } from "../types";

type Props = {
  diaries?: Diary[];
};

export default function DiaryList({ diaries: propDiaries }: Props = {}) {
  const [fetchedDiaries, setFetchedDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    if (propDiaries !== undefined) return;
    fetch("/api/diaries", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setFetchedDiaries(data));
  }, [propDiaries]);

  const diaries = propDiaries ?? fetchedDiaries;

  return (
    <ul className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
      {diaries.map((diary) => (
        <li key={diary.id}>
          <Link href={`/diaries/${diary.id}`} className="block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
              {new Date(diary.createdAt).toLocaleString()}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 line-clamp-3">{diary.content}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
