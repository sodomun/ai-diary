"use client";

import CreateDiaryHeader from "../../components/CreateDiaryHeader";
import Footer from "../../components/Footer";

export default function NewDiaryPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CreateDiaryHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <textarea
          className="w-full h-64 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
          placeholder="Write your diary..."
        />
      </main>
      <Footer />
    </div>
  );
}
