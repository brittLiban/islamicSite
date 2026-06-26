import { NextRequest, NextResponse } from 'next/server'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { s3, HLS_BUCKET } from '@/lib/minio'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lessonId: string; segments: string[] }> }
) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { lessonId, segments } = await params

  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: { module: { select: { courseId: true } } },
  })

  if (!lesson?.hlsReady || !lesson.hlsKey) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Free preview lessons are always accessible; otherwise check enrollment
  if (!lesson.isFreePreview) {
    const isAdmin = (session.user as { role?: string }).role === 'admin'
    if (!isAdmin) {
      const enrollment = await db.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id as string,
            courseId: lesson.module.courseId,
          },
        },
      })
      if (!enrollment) {
        return NextResponse.json({ error: 'Not enrolled' }, { status: 403 })
      }
    }
  }

  const segmentPath = segments.join('/')
  const key = `${lesson.hlsKey}/${segmentPath}`

  try {
    const response = await s3.send(new GetObjectCommand({ Bucket: HLS_BUCKET, Key: key }))
    const body = await response.Body?.transformToByteArray()
    if (!body) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const isM3u8 = segmentPath.endsWith('.m3u8')
    return new NextResponse(body, {
      headers: {
        'Content-Type': isM3u8 ? 'application/vnd.apple.mpegurl' : 'video/MP2T',
        'Cache-Control': isM3u8 ? 'no-store' : 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
