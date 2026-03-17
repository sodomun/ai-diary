import Image from "next/image";

type Props = {
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function EditDiaryHeader({ onEdit, onDelete }: Props) {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">日記</h1>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Image src="/icons/edit.png" alt="edit" width={24} height={24} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Image src="/icons/trash-can.png" alt="delete" width={24} height={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
