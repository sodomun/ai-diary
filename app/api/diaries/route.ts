import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { Diary } from "../../types";

const dataPath = path.join(process.cwd(), "data", "diary.json");

async function readDiaries(): Promise<Diary[]> {
  const raw = await readFile(dataPath, "utf-8");
  return JSON.parse(raw) as Diary[];
}

export async function GET() {
  const diaries = await readDiaries();
  return NextResponse.json(diaries);
}

export async function POST(request: Request) {
  const body = await request.json();
  const diaries = await readDiaries();

  const newDiary: Diary = {
    id: crypto.randomUUID(),
    content: body.content,
    createdAt: new Date().toISOString(),
  };

  diaries.push(newDiary);
  await writeFile(dataPath, JSON.stringify(diaries, null, 2), "utf-8");

  return NextResponse.json(newDiary, { status: 201 });
}
