import Link from "next/link";
import SettingsHeader from "../components/SettingsHeader";
import Footer from "../components/Footer";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <SettingsHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <Link
          href="/settings/ai-prompt"
          className="block w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          AIの性格を決める
        </Link>
        <Link
          href="/settings/credits"
          className="block w-full p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          クレジット
        </Link>
      </main>
      <Footer />
    </div>
  );
}
