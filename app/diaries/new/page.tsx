"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreateDiaryHeader from "../../components/CreateDiaryHeader";
import Footer from "../../components/Footer";

export default function NewDiaryPage() {
  const router = useRouter();
  const [content, setContent] = useState("");

  async function handleSave() {
    await fetch("/api/diaries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    router.push("/diaries");
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CreateDiaryHeader onSave={handleSave} />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
          placeholder="Write your diary..."
        />
      </main>
      <Footer />
    </div>
  );
}
