"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import EditDiaryHeader from "../../components/EditDiaryHeader";
import Footer from "../../components/Footer";
import { Diary } from "../../types";

export default function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [diary, setDiary] = useState<Diary | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(`/api/diaries/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Diary) => {
        setDiary(data);
        setContent(data.content);
      });
  }, [id]);

  async function handleEdit() {
    await fetch(`/api/diaries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    router.push("/diaries");
  }

  if (!diary) return null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <EditDiaryHeader onEdit={handleEdit} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
          {new Date(diary.createdAt).toLocaleString()}
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
      </main>
      <Footer />
    </div>
  );
}
