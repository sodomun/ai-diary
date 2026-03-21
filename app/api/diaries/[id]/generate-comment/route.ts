import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const openai = new OpenAI({ // apiKey を取得
  apiKey: process.env.OPENAI_KEY,
});

const DEFAULT_AI_PROMPT =
  '日記に対して、共感的で自然な短いコメントを日本語で書いてください。1〜3文程度で、説教くさくならないようにしてください。'

async function getAiPrompt(supabase: Awaited<ReturnType<typeof createClient>>): Promise<string> {
  const { data } = await supabase
    .from('app_settings')
    .select('ai_prompt')
    .limit(1)
    .maybeSingle()
  return data?.ai_prompt ?? DEFAULT_AI_PROMPT
}

function buildPrompt(content: string, systemPrompt: string): string {
  return `${systemPrompt}\n\n日記:\n${content}`
}

function formatDiary(diary: Record<string, unknown>) {
  return {
    id: diary.id,
    content: diary.content,
    createdAt: diary.created_at,
    contentByAi: diary.content_by_ai,
    themeColor: diary.theme_color,
    aiPrompt: diary.ai_prompt,
  }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string}> }
) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Fetch diary entry
  const { data: diary, error: fetchError } = await supabase
    .from('diaries')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (fetchError) { // apiKey を取得失敗した場合のエラーログ
    console.error('[generate-comment] Supabase fetch error:', fetchError)
    return NextResponse.json({ error: 'Failed to fetch diary from Supabase' }, { status: 500 })
  }
  if (!diary) {
    console.error('[generate-comment] Diary not found for id:', id)
    return NextResponse.json({ error: 'Diary not found' }, { status: 404 })
  }

  // Generate AI comment
  const systemPrompt = await getAiPrompt(supabase)
  let contentByAi: string
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-5-mini', // AI api のモデル名
      messages: [{ role: 'user', content: buildPrompt(diary.content, systemPrompt) }],
      max_completion_tokens: 1000,
    })
    const text = completion.choices[0]?.message?.content?.trim()
    if (!text) {
      return NextResponse.json({ error: 'OpenAI returned empty response' }, { status: 500 })
    }
    contentByAi = text
  } catch (err) { // apiKey を取得失敗した場合のエラーログ
    const error = err as { message?: string; status?: number }
    console.error('[generate-comment] OpenAI request failed:', {
      message: error.message,
      status: error.status,
    })
    return NextResponse.json({ error: 'OpenAI generation failed' }, { status: 500 })
  }

  // Save to Supabase
  const { data: updated, error: updateError } = await supabase
    .from('diaries')
    .update({ content_by_ai: contentByAi })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single()

  if (updateError) {
    console.error('[generate-comment] Supabase update error:', updateError)
    return NextResponse.json({ error: 'Failed to update content_by_ai in Supabase' }, { status: 500 })
  }
  if (!updated) {
    console.error('[generate-comment] Supabase update returned no data for id:', id)
    return NextResponse.json({ error: 'Failed to retrieve updated diary from Supabase' }, { status: 500 })
  }

  return NextResponse.json(formatDiary(updated))
}
