import DiaryHeader from "../components/DiaryHeader";
import Footer from "../components/Footer";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <DiaryHeader />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-xl text-zinc-700 dark:text-zinc-300">Settings Page</p>
      </main>
      <Footer />
    </div>
  );
}
