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
  const [aiComment, setAiComment] = useState<string | null | undefined>(undefined);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/diaries/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Diary) => {
        setDiary(data);
        setContent(data.content);
        setAiComment(data.contentByAi);
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

  async function handleGenerateComment() {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch(`/api/diaries/${id}/generate-comment`, { method: "POST" });
      if (!res.ok) throw new Error("生成に失敗しました");
      const data: Diary = await res.json();
      setAiComment(data.contentByAi);
    } catch {
      setAiError("AIコメントの生成に失敗しました。もう一度お試しください。");
    } finally {
      setAiLoading(false);
    }
  }

  async function handleDelete() {
    await fetch(`/api/diaries/${id}`, { method: "DELETE" });
    router.push("/diaries");
  }

  if (!diary) return null;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <EditDiaryHeader onEdit={handleEdit} onDelete={handleDelete} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
          {new Date(diary.createdAt).toLocaleString()}
        </p>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />

        <div className="mt-6 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">AIコメント</h2>
            <button
              onClick={handleGenerateComment}
              disabled={aiLoading}
              className="text-xs px-3 py-1.5 rounded-md bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {aiLoading ? "生成中..." : "AIコメント生成"}
            </button>
          </div>
          {aiError && (
            <p className="text-xs text-red-500">{aiError}</p>
          )}
          {!aiError && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 whitespace-pre-wrap">
              {aiComment ?? "AIコメントはまだ生成されていません"}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
