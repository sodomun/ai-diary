import DiaryHeader from "../../components/DiaryHeader";
import Footer from "../../components/Footer";
import { Diary } from "../../types";
import diariesData from "../../../data/diary.json";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DiaryDetailPage({ params }: Props) {
  const { id } = await params;
  const diaries = diariesData as Diary[];
  const diary = diaries.find((d) => d.id === id);

  if (!diary) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <DiaryHeader />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4">
          {new Date(diary.createdAt).toLocaleString()}
        </p>
        <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{diary.content}</p>
      </main>
      <Footer />
    </div>
  );
}
