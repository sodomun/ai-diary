import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import Footer from '@/app/components/Footer';
import { UsernameForm, PasswordForm } from '@/app/components/ProfileForms';

// 電子メール名の閲覧処理はこのファイルが受け付けている.
export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-black">
      <header className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-700">
        <div className="max-w-3xl mx-auto px-4 py-3 relative flex items-center">
          <Link
            href="/settings"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50"
          >
            戻る
          </Link>
          <span className="absolute left-1/2 -translate-x-1/2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            プロフィール
          </span>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
        <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 mb-4">
            メールアドレス
          </h2>
          <p className="w-full px-4 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-sm">
            {user.email}
          </p>
        </section>

        <UsernameForm initialUsername={profile?.username ?? ''} />

        <PasswordForm />
      </main>

      <Footer />
    </div>
  );
}
