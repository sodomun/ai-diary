import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Diary } from "../../../types";

const dataPath = path.join(process.cwd(), "data", "diary.json");

async function readDiaries(): Promise<Diary[]> {
  const raw = await readFile(dataPath, "utf-8");
  return JSON.parse(raw) as Diary[];
}

type Params = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const diaries = await readDiaries();
  const diary = diaries.find((d) => d.id === id);

  if (!diary) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(diary);
}

export async function PUT(request: Request, { params }: Params) {
  const { id } = await params;
  const body = await request.json();
  const diaries = await readDiaries();
  const index = diaries.findIndex((d) => d.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  diaries[index] = { ...diaries[index], content: body.content };
  await writeFile(dataPath, JSON.stringify(diaries, null, 2), "utf-8");

  return NextResponse.json(diaries[index]);
}

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const diaries = await readDiaries();
  const index = diaries.findIndex((d) => d.id === id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  diaries.splice(index, 1);
  await writeFile(dataPath, JSON.stringify(diaries, null, 2), "utf-8");

  return NextResponse.json({ success: true });
}
