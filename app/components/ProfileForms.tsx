'use client';

import { useState } from 'react';
import { updateUsername, updatePassword } from '@/actions/profile';

// profile/page.tsx に表示されるユーザ名の閲覧/編集フォーム
export function UsernameForm({ initialUsername }: { initialUsername: string }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false); // 一時中断

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    setPending(true);
    const result = await updateUsername(formData);
    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
        ユーザー名
      </h2>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          defaultValue={initialUsername}
          required
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition text-sm"
          placeholder="ユーザー名"
        />
        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
            ユーザー名を更新しました
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full py-2.5 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? '更新中' : '更新する'}
        </button>
      </form>
    </section>
  );
}

// profile/page.tsx に表示されるパスワード編集フォーム
export function PasswordForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    setPending(true);
    const result = await updatePassword(formData);
    setPending(false);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
    }
  };

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6">
      <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
        パスワード変更
      </h2>
      <form action={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition text-sm"
          placeholder="新しいパスワード（6文字以上）"
        />
        <input
          type="password"
          name="confirmPassword"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 transition text-sm"
          placeholder="新しいパスワード（確認）"
        />
        {error && (
          <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg px-4 py-2">
            {error}
          </p>
        )}
        {success && (
          <p className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg px-4 py-2">
            パスワードを変更しました
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="w-full py-2.5 bg-zinc-800 dark:bg-zinc-100 hover:bg-zinc-700 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-semibold rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? '変更中' : '変更する'}
        </button>
      </form>
    </section>
  );
}
