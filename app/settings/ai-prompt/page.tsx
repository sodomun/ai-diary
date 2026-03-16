"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "../../components/Footer";

const DEFAULT_PROMPT =
  "日記に対して、共感的で自然な短いコメントを日本語で書いてください。1〜3文程度で、説教くさくならないようにしてください。";
const MAX_LENGTH = 100;

export default function AiPromptSettingsPage() {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings/ai-prompt")
      .then((res) => res.json())
      .then((data) => {
        setValue(data.aiPrompt ?? DEFAULT_PROMPT);
      });
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaveError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/settings/ai-prompt", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ aiPrompt: value }),
      });
      if (!res.ok) {
        const data = await res.json();
        setSaveError(data.error ?? "保存に失敗しました");
      } else {
        setSaved(true);
      }
    } catch {
      setSaveError("保存に失敗しました");
    } finally {
      setSaving(false);
    }
  }

  const isOverLimit = value.length > MAX_LENGTH;

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link
            href="/settings"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            ← 戻る
          </Link>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            AIの性格を決める
          </span>
        </div>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
          日記へのAIコメント生成時に使われるプロンプトです。
        </p>
        <textarea
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setSaved(false);
          }}
          rows={5}
          className="w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-700 dark:text-zinc-300 resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        />
        <div className="flex items-center justify-between mt-2">
          <span
            className={`text-xs ${
              isOverLimit ? "text-red-500" : "text-zinc-400 dark:text-zinc-500"
            }`}
          >
            {value.length} / {MAX_LENGTH}
          </span>
          <button
            onClick={handleSave}
            disabled={saving || isOverLimit}
            className="text-sm px-4 py-2 rounded-md bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saving ? "保存中..." : "保存"}
          </button>
        </div>
        {saveError && (
          <p className="mt-2 text-xs text-red-500">{saveError}</p>
        )}
        {saved && (
          <p className="mt-2 text-xs text-green-600 dark:text-green-400">
            保存しました
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
