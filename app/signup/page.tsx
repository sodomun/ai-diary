'use client';

import { signup } from '@/actions/auth';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await signup(formData);
    if (result && result.error) {
      setError(result.error);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8'>
        <h2 className='text-2xl font-bold text-center text-slate-800 mb-2'>
          アカウント登録
        </h2>
        <p className='text-center text-slate-500 text-sm mb-8'>
          新しいアカウントを作成してください
        </p>
        <form action={handleSubmit} className='space-y-5'>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1' htmlFor='username'>
              ユーザー名
            </label>
            <input
              type='text'
              id='username'
              name='username'
              className='w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition'
              placeholder='ユーザー名'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1' htmlFor='email'>
              メールアドレス
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition'
              placeholder='example@email.com'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-1' htmlFor='password'>
              パスワード
            </label>
            <input
              type='password'
              id='password'
              name='password'
              className='w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition'
              placeholder='8文字以上'
              required
            />
          </div>
          {error && (
            <p className='text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2'>
              {error}
            </p>
          )}
          <button
            type='submit'
            className='w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg transition cursor-pointer'
          >
            登録する
          </button>
        </form>
        <p className='text-center text-sm text-slate-500 mt-6'>
          すでにアカウントをお持ちですか？{' '}
          <Link href='/login' className='text-slate-800 font-medium hover:underline'>
            ログインはこちら
          </Link>
        </p>
      </div>
    </div>
  );
}
