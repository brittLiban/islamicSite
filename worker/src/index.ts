import { Worker } from 'bullmq'
import { Redis } from 'ioredis'
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
} from '@aws-sdk/client-s3'
import { PrismaClient } from '@prisma/client'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, readdir, mkdir, rm, mkdtemp } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)
const db = new PrismaClient()

const redisUrl = process.env.REDIS_URL ?? 'redis://localhost:6379'
const connection = new Redis(redisUrl, { maxRetriesPerRequest: null })

const s3 = new S3Client({
  endpoint: `http://${process.env.MINIO_ENDPOINT ?? 'localhost'}:${process.env.MINIO_PORT ?? '9000'}`,
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY ?? 'qarawiyyin',
    secretAccessKey: process.env.MINIO_SECRET_KEY ?? 'qarawiyyin',
  },
  forcePathStyle: true,
})

const RAW_BUCKET = process.env.MINIO_BUCKET_RAW ?? 'raw-uploads'
const HLS_BUCKET = process.env.MINIO_BUCKET_HLS ?? 'hls-segments'

async function ensureBuckets() {
  for (const bucket of [RAW_BUCKET, HLS_BUCKET]) {
    try {
      await s3.send(new HeadBucketCommand({ Bucket: bucket }))
    } catch {
      await s3.send(new CreateBucketCommand({ Bucket: bucket }))
      console.log(`[worker] Created bucket: ${bucket}`)
    }
  }
}

type TranscodeJob = { lessonId: string; rawKey: string }

async function transcode(lessonId: string, rawKey: string) {
  const workDir = await mkdtemp(join(tmpdir(), `transcode-${lessonId}-`))
  const inputPath = join(workDir, 'input.mp4')
  const outputDir = join(workDir, 'hls')

  try {
    // Download raw video
    console.log(`[worker] Downloading ${rawKey}`)
    const res = await s3.send(new GetObjectCommand({ Bucket: RAW_BUCKET, Key: rawKey }))
    const bytes = await res.Body!.transformToByteArray()
    await writeFile(inputPath, bytes)
    await mkdir(outputDir, { recursive: true })

    // FFmpeg → 720p HLS
    console.log(`[worker] Transcoding ${lessonId}`)
    await execFileAsync('ffmpeg', [
      '-i', inputPath,
      '-c:v', 'libx264',
      '-crf', '23',
      '-preset', 'fast',
      '-vf', 'scale=-2:720',
      '-c:a', 'aac',
      '-b:a', '128k',
      '-hls_time', '6',
      '-hls_playlist_type', 'vod',
      '-hls_segment_filename', join(outputDir, 'seg%03d.ts'),
      join(outputDir, 'playlist.m3u8'),
    ])

    // Get video duration via ffprobe
    let durationSeconds = 0
    try {
      const { stdout } = await execFileAsync('ffprobe', [
        '-v', 'quiet',
        '-print_format', 'json',
        '-show_format',
        inputPath,
      ])
      const info = JSON.parse(stdout) as { format: { duration?: string } }
      durationSeconds = Math.round(parseFloat(info.format.duration ?? '0'))
    } catch { /* non-fatal */ }

    // Upload HLS files to MinIO
    const hlsKey = `courses/${lessonId}`
    const files = await readdir(outputDir)
    console.log(`[worker] Uploading ${files.length} HLS files`)

    for (const file of files) {
      const content = await readFile(join(outputDir, file))
      const contentType = file.endsWith('.m3u8')
        ? 'application/vnd.apple.mpegurl'
        : 'video/MP2T'
      await s3.send(new PutObjectCommand({
        Bucket: HLS_BUCKET,
        Key: `${hlsKey}/${file}`,
        Body: content,
        ContentType: contentType,
      }))
    }

    // Mark lesson as ready
    await db.lesson.update({
      where: { id: lessonId },
      data: { hlsKey, hlsReady: true, durationSeconds },
    })
    console.log(`[worker] Done: ${lessonId} (${durationSeconds}s)`)
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }
}

const worker = new Worker<TranscodeJob>(
  'transcode',
  async (job) => transcode(job.data.lessonId, job.data.rawKey),
  { connection, concurrency: 2 }
)

worker.on('completed', (job) => console.log(`[worker] Job ${job.id} completed`))
worker.on('failed', (job, err) => console.error(`[worker] Job ${job?.id} failed:`, err.message))

console.log('[worker] Transcoding worker started')
ensureBuckets().catch(console.error)
