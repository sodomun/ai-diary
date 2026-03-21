"use client";

import Link from "next/link";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Diary } from "../types";

type Props = {
  diaries?: Diary[];
  query?: string;
};

function highlight(text: string, query: string) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow-200 dark:bg-yellow-500/40 px-0.5 rounded">
        {part}
      </span>
    ) : (
      part
    )
  );
}

// undefined(キャッシュに存在しない新規日記データ)がある場合に限って、/api/diaries経由で最新日記情報を取得する.
export default function DiaryList({ diaries: propDiaries, query = "" }: Props = {}) {
  const { data: fetchedDiaries = [] } = useSWR<Diary[]>(
    propDiaries !== undefined ? null : "/api/diaries",
    fetcher
  );

  const diaries = propDiaries ?? fetchedDiaries;

  return (
    <ul className="w-full max-w-3xl mx-auto px-4 py-6 flex flex-col gap-4">
      {diaries.map((diary) => (
        <li key={diary.id}>
          <Link href={`/diaries/${diary.id}`} className="block bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
            <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-2">
              {(() => {
                const d = new Date(diary.createdAt);
                return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
              })()}
            </p>
            <p className="text-zinc-700 dark:text-zinc-300 line-clamp-3">{highlight(diary.content, query)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
