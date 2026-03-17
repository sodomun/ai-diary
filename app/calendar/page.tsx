import CalendarHeader from "../components/CaldendarHeader";
import Footer from "../components/Footer";

export default function CalendarPage() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <CalendarHeader />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-xl text-zinc-700 dark:text-zinc-300">Calendar Page</p>
      </main>
      <Footer />
    </div>
  );
}
