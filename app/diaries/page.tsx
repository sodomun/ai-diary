import DiaryHeader from "../components/DiaryHeader";
import Footer from "../components/Footer";
import DiaryList from "../components/DiaryList";
import { Diary } from "../types";
import diariesData from "../../data/diary.json";

export default function DiariesPage() {
  const diaries = diariesData as Diary[];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <DiaryHeader />
      <main className="flex-1">
        <DiaryList diaries={diaries} />
      </main>
      <Footer />
    </div>
  );
}
