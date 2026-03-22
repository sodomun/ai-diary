import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabase
    .from('app_settings')
    .select('ai_prompt')
    .eq('user_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('[settings/ai-prompt] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }

  return NextResponse.json({ aiPrompt: data?.ai_prompt ?? null })
}

export async function PUT(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { aiPrompt } = await req.json()

  if (typeof aiPrompt !== 'string') {
    return NextResponse.json({ error: 'aiPrompt must be a string' }, { status: 400 })
  }
  if (aiPrompt.length > 100) {
    return NextResponse.json({ error: 'aiPrompt must be 100 characters or fewer' }, { status: 400 })
  }

  const { error: saveError } = await supabase
    .from('app_settings')
    .upsert(
      { user_id: user.id, ai_prompt: aiPrompt, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    )

  if (saveError) {
    console.error('[settings/ai-prompt] PUT save error:', saveError)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }

  return NextResponse.json({ aiPrompt })
}
