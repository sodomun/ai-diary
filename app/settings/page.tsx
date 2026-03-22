"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSWRConfig } from "swr";
import SettingsHeader from "../components/SettingsHeader";
import Footer from "../components/Footer";
import { logout } from "@/actions/auth";

export default function SettingsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const handleLogout = async () => {
    // ログアウト時に revalidate せずに, 強制的にキャッシュを変更（削除）する.
    await mutate(() => true, undefined, { revalidate: false });
    await logout();
  };

  const handleDelete = async () => {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/api/diaries", { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "削除に失敗しました");
        return;
      }
      setIsOpen(false);
      router.push("/diaries");
    } catch {
      setError("削除に失敗しました");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <SettingsHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col items-center gap-3">
        <Link
          href="/settings/profile"
          className="w-48 text-center py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          プロフィール
        </Link>
        <Link
          href="/settings/ai-prompt"
          className="w-48 text-center py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          AIの性格を決める
        </Link>
        <Link
          href="/settings/credits"
          className="w-48 text-center py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          クレジット
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-48 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          ログアウト
        </button>
        <button
          onClick={() => { setError(null); setIsOpen(true); }}
          className="w-48 py-2.5 bg-white dark:bg-zinc-900 border border-red-300 dark:border-red-800 rounded-lg text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
        >
          全削除
        </button>
      </main>
      <Footer />

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 w-80 shadow-xl">
            <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
              本当にすべての日記を削除しますか？
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              この操作は元に戻せません
            </p>
            {error && (
              <p className="text-xs text-red-500 mt-2">{error}</p>
            )}
            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setIsOpen(false)}
                disabled={deleting}
                className="flex-1 px-4 py-2 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? "削除中..." : "削除する"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
