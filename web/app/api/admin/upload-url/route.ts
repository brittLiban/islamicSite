import { NextRequest, NextResponse } from 'next/server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { auth } from '@/auth'
import { s3Public, RAW_BUCKET } from '@/lib/minio'
import { randomUUID } from 'crypto'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user || (session.user as { role?: string }).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json() as { lessonId?: string; fileName?: string }
  const { lessonId, fileName } = body
  if (!lessonId) return NextResponse.json({ error: 'lessonId required' }, { status: 400 })

  const ext = (fileName?.split('.').pop() ?? 'mp4').toLowerCase()
  const rawKey = `uploads/${lessonId}/${randomUUID()}.${ext}`

  const command = new PutObjectCommand({
    Bucket: RAW_BUCKET,
    Key: rawKey,
    ContentType: 'video/mp4',
  })

  const url = await getSignedUrl(s3Public, command, { expiresIn: 3600 })
  return NextResponse.json({ url, rawKey })
}
