import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Diary } from "../../types";

function toDiary(row: { id: string; content: string; created_at: string }): Diary {
  return { id: row.id, content: row.content, createdAt: row.created_at };
}

export async function GET() {
  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data.map(toDiary));
}

export async function DELETE() {
  const { error } = await supabase
    .from("diaries")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  const { content } = await request.json();

  const { data, error } = await supabase
    .from("diaries")
    .insert({ content })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(toDiary(data), { status: 201 });
}
