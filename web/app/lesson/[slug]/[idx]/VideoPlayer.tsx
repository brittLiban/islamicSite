'use client'

import { useEffect, useRef } from 'react'

export function VideoPlayer({ lessonId }: { lessonId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const src = `/api/hls/${lessonId}/playlist.m3u8`

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS — Safari, iOS
      video.src = src
      return
    }

    // hls.js for Chrome / Firefox
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let hls: any = null
    import('hls.js').then(({ default: Hls }) => {
      if (!Hls.isSupported() || !videoRef.current) return
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(videoRef.current)
    })

    return () => { hls?.destroy() }
  }, [lessonId])

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', height: '100%', background: '#000', objectFit: 'contain' }}
      playsInline
    />
  )
}
