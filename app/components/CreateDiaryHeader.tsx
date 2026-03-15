type Props = {
  onSave?: () => void;
};

export default function CreateDiaryHeader({ onSave }: Props) {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">New Diary</h1>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
        >
          Save
        </button>
      </div>
    </header>
  );
}
