import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Diary } from "../../../types";

function toDiary(row: { id: string; content: string; created_at: string }): Diary {
  return { id: row.id, content: row.content, createdAt: row.created_at };
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("diaries")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(toDiary(data));
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const { content } = await request.json();

  const { data, error } = await supabase
    .from("diaries")
    .update({ content })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(toDiary(data));
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;

  const { error } = await supabase
    .from("diaries")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
