import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getTranscodeQueue } from '@/lib/queue'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as { lessonId?: string; rawKey?: string }
  const { lessonId, rawKey } = body
  if (!lessonId || !rawKey) {
    return NextResponse.json({ error: 'lessonId and rawKey required' }, { status: 400 })
  }

  const queue = getTranscodeQueue()
  await queue.add('transcode', { lessonId, rawKey }, {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
  })

  return NextResponse.json({ ok: true })
}
