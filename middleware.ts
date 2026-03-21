import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/diaries', '/calendar', '/settings'];
  if (protectedPaths.some((p) => pathname.startsWith(p)) && !user) { // proctedPathsのいずれかのURLに一致し, かつ非ログイン状態においてはログイン画面に強制遷移される.
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if ((pathname === '/login' || pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/diaries', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/diaries/:path*', '/calendar/:path*', '/settings/:path*', '/login', '/signup'],
};
