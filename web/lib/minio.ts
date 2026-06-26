import { S3Client } from '@aws-sdk/client-s3'

const endpoint = process.env.MINIO_ENDPOINT ?? 'localhost'
const port = process.env.MINIO_PORT ?? '9000'
const accessKey = process.env.MINIO_ACCESS_KEY ?? 'qarawiyyin'
const secretKey = process.env.MINIO_SECRET_KEY ?? 'qarawiyyin'

// Internal client — server-side reads and proxying
export const s3 = new S3Client({
  endpoint: `http://${endpoint}:${port}`,
  region: 'us-east-1',
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  forcePathStyle: true,
})

// Public client — presigned upload URLs the browser can reach
const publicBase = process.env.MINIO_PUBLIC_URL ?? `http://localhost:${port}`
export const s3Public = new S3Client({
  endpoint: publicBase,
  region: 'us-east-1',
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  forcePathStyle: true,
})

export const RAW_BUCKET = process.env.MINIO_BUCKET_RAW ?? 'raw-uploads'
export const HLS_BUCKET = process.env.MINIO_BUCKET_HLS ?? 'hls-segments'
