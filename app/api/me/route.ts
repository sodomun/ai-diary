import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

//  サーバーサイドで現在のログインユーザーを返すAPI ルート. 未ログイン時は null + 401 を返す.
export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(null, { status: 401 });
  }
  return NextResponse.json({ id: user.id });
}
