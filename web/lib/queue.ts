import { Queue } from 'bullmq'
import { Redis } from 'ioredis'

export type TranscodeJob = {
  lessonId: string
  rawKey: string
}

let _redis: Redis | null = null
function getRedis() {
  if (!_redis) {
    _redis = new Redis(process.env.REDIS_URL ?? 'redis://localhost:6379', {
      maxRetriesPerRequest: null,
    })
  }
  return _redis
}

let _queue: Queue<TranscodeJob> | null = null
export function getTranscodeQueue() {
  if (!_queue) {
    _queue = new Queue<TranscodeJob>('transcode', { connection: getRedis() })
  }
  return _queue
}
