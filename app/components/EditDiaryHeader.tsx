type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function EditDiaryHeader({ onEdit, onDelete }: Props) {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">Diary</h1>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 text-sm font-medium rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </header>
  );
}
