import Image from "next/image";

type Props = {
  createdAt?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = String(d.getHours()).padStart(2, "0");
  const minute = String(d.getMinutes()).padStart(2, "0");
  return `${year}年${month}月${day}日 ${hour}:${minute}`;
}

export default function EditDiaryHeader({ createdAt, onEdit, onDelete }: Props) {
  return (
    <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <span className="text-base font-medium text-zinc-700 dark:text-zinc-200">
          {createdAt ? formatDate(createdAt) : ""}
        </span>
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
