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

// propDiariesが渡された場合はSWRを使わず、ない場合は/api/meでuser_idを確定してからキャッシュを分離して取得する.
export default function DiaryList({ diaries: propDiaries, query = "" }: Props = {}) {
  const needsFetch = propDiaries === undefined;

  // propDiariesがない場合のみ /api/me でユーザーを確定する
  const { data: me, isLoading: isUserLoading } = useSWR<{ id: string } | null>(
    needsFetch ? "/api/me" : null,
    fetcher
  );

  // userが確定するまでnullキーでフェッチ停止。user_idをキーに含めてユーザーごとにキャッシュを分離する。
  const swrKey = needsFetch && me ? ["/api/diaries", me.id] : null;

  const { data: fetchedDiaries, isLoading: isDiariesLoading } = useSWR<Diary[]>(
    swrKey,
    ([url]: [string]) => fetcher(url)
  );

  const diaries = propDiaries ?? fetchedDiaries ?? [];

  if (needsFetch && (isUserLoading || isDiariesLoading)) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-10 flex justify-center">
        <p className="text-sm text-zinc-400 dark:text-zinc-500">読み込み中...</p>
      </div>
    );
  }

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
