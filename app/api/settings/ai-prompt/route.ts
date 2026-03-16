import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('app_settings')
    .select('ai_prompt')
    .limit(1)
    .maybeSingle()

  if (error) {
    console.error('[settings/ai-prompt] GET error:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }

  return NextResponse.json({ aiPrompt: data?.ai_prompt ?? null })
}

export async function PUT(req: NextRequest) {
  const { aiPrompt } = await req.json()

  if (typeof aiPrompt !== 'string') {
    return NextResponse.json({ error: 'aiPrompt must be a string' }, { status: 400 })
  }
  if (aiPrompt.length > 100) {
    return NextResponse.json({ error: 'aiPrompt must be 100 characters or fewer' }, { status: 400 })
  }

  // Check if a row already exists
  const { data: existing, error: fetchError } = await supabase
    .from('app_settings')
    .select('id')
    .limit(1)
    .maybeSingle()

  if (fetchError) {
    console.error('[settings/ai-prompt] PUT fetch error:', fetchError)
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 })
  }

  let saveError
  if (existing) {
    const { error } = await supabase
      .from('app_settings')
      .update({ ai_prompt: aiPrompt, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    saveError = error
  } else {
    const { error } = await supabase
      .from('app_settings')
      .insert({ ai_prompt: aiPrompt })
    saveError = error
  }

  if (saveError) {
    console.error('[settings/ai-prompt] PUT save error:', saveError)
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 })
  }

  return NextResponse.json({ aiPrompt })
}
