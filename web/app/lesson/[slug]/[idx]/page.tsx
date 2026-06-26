import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { Mark } from '@/components/ui/mark'
import { courses, curricula } from '@/lib/data'
import { NotesTab } from './NotesTab'
import { VideoPlayer } from './VideoPlayer'

type LessonRow = {
  id: string
  title: string
  durationSeconds: number
  hlsReady: boolean
  hlsKey: string | null
  isFreePreview: boolean
  moduleTitle: string
  globalIdx: number
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; idx: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { slug, idx } = await params

  // ── Fetch from DB, fall back to static data ──────────────────
  let courseTitle = ''
  let allLessons: LessonRow[] = []
  let modules: { title: string; lessons: LessonRow[] }[] = []

  const dbCourse = await db.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { sortOrder: 'asc' },
        include: { lessons: { orderBy: { sortOrder: 'asc' } } },
      },
    },
  }).catch(() => null)

  if (dbCourse && dbCourse.modules.length > 0) {
    courseTitle = dbCourse.title
    let g = 0
    modules = dbCourse.modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        durationSeconds: l.durationSeconds,
        hlsReady: l.hlsReady,
        hlsKey: l.hlsKey,
        isFreePreview: l.isFreePreview,
        moduleTitle: m.title,
        globalIdx: g++,
      })),
    }))
    allLessons = modules.flatMap((m) => m.lessons)
  } else {
    // Static fallback
    const staticCourse = courses.find((c) => c.slug === slug)
    if (!staticCourse) notFound()
    courseTitle = staticCourse.title
    const staticModules = curricula[slug] ?? []
    let g = 0
    modules = staticModules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({
        id: '',
        title: l.title,
        durationSeconds: 0,
        hlsReady: false,
        hlsKey: null,
        isFreePreview: l.free ?? false,
        moduleTitle: m.title,
        globalIdx: g++,
      })),
    }))
    allLessons = modules.flatMap((m) => m.lessons)
  }

  if (allLessons.length === 0) notFound()

  const lessonIdx = Math.max(0, parseInt(idx, 10) - 1)
  const lesson = allLessons[lessonIdx] ?? allLessons[0]
  const prevLesson = lessonIdx > 0 ? allLessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < allLessons.length - 1 ? allLessons[lessonIdx + 1] : null

  const durationLabel = lesson.durationSeconds > 0
    ? `${Math.floor(lesson.durationSeconds / 60)} min`
    : null

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--ink)' }}>

      {/* Top bar */}
      <header style={{
        background: 'var(--forest-2)',
        borderBottom: '1px solid rgba(220,182,94,0.15)',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        flexShrink: 0,
      }}>
        <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
          <Mark size={32} />
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, color: 'rgba(245,237,216,0.5)', fontVariant: 'small-caps', letterSpacing: '0.15em', marginBottom: 2 }}>
            {courseTitle}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            color: 'var(--paper)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {lesson.title}
          </div>
        </div>
        <Link href="/dashboard" style={{ fontSize: 13, color: 'rgba(245,237,216,0.5)', textDecoration: 'none', flexShrink: 0 }}>
          ← Dashboard
        </Link>
      </header>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>

        {/* Video + notes area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

          {/* Video region */}
          <div style={{ background: '#000', aspectRatio: '16/9', position: 'relative', maxHeight: '65vh' }}>
            {lesson.hlsReady && lesson.id ? (
              <VideoPlayer lessonId={lesson.id} />
            ) : (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--paper)',
              }}>
                <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.3 }}>▶</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'rgba(245,237,216,0.5)', fontStyle: 'italic' }}>
                  Video coming soon
                </div>
                {durationLabel && (
                  <div style={{ fontSize: 13, color: 'rgba(245,237,216,0.3)', marginTop: 8 }}>
                    {durationLabel}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Notes + transcript */}
          <NotesTab lessonTitle={lesson.title} />

          {/* Lesson info + nav */}
          <div style={{ padding: '28px 32px', background: 'var(--paper)', flex: 1 }}>
            <div style={{ maxWidth: 800 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{lesson.moduleTitle}</div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, margin: '0 0 16px' }}>
                {lesson.title}
              </h1>
              <p style={{ color: 'var(--fg-2)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 28 }}>
                This lesson is part of {courseTitle}. Lesson notes and transcript will appear here once the video has been watched.
              </p>

              <div style={{ display: 'flex', gap: 12 }}>
                {prevLesson && (
                  <Link
                    href={`/lesson/${slug}/${lessonIdx}`}
                    className="btn btn--secondary btn--md"
                    style={{ textDecoration: 'none' }}
                  >
                    ← Previous
                  </Link>
                )}
                {nextLesson && (
                  <Link
                    href={`/lesson/${slug}/${lessonIdx + 2}`}
                    className="btn btn--primary btn--md"
                    style={{ textDecoration: 'none' }}
                  >
                    Next lesson →
                  </Link>
                )}
                {!nextLesson && (
                  <div style={{ fontSize: 14, color: 'var(--fg-3)', fontStyle: 'italic', padding: '9px 0' }}>
                    This is the last lesson. May Allah accept it from you.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar — lesson list */}
        <aside style={{
          width: 320,
          background: 'var(--paper-2)',
          borderLeft: '1px solid var(--border)',
          overflow: 'auto',
          flexShrink: 0,
        }}>
          <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, background: 'var(--paper-2)' }}>
            <div className="eyebrow">Course content</div>
            <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4 }}>
              {allLessons.length} lessons · {lessonIdx + 1} of {allLessons.length}
            </div>
          </div>

          {modules.map((mod, mi) => (
            <div key={mi}>
              <div style={{
                padding: '10px 16px',
                background: 'var(--paper-3)',
                borderBottom: '1px solid var(--border-soft)',
                borderTop: mi > 0 ? '1px solid var(--border)' : 'none',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--fg-2)',
                fontVariant: 'small-caps',
                letterSpacing: '0.12em',
              }}>
                {mod.title}
              </div>
              {mod.lessons.map((l) => {
                const isActive = l.globalIdx === lessonIdx
                const dur = l.durationSeconds > 0 ? `${Math.floor(l.durationSeconds / 60)} min` : null
                return (
                  <Link
                    key={l.globalIdx}
                    href={`/lesson/${slug}/${l.globalIdx + 1}`}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '10px 16px',
                      borderBottom: '1px solid var(--border-soft)',
                      background: isActive ? 'var(--forest-soft)' : 'transparent',
                      textDecoration: 'none',
                      borderLeft: isActive ? '3px solid var(--forest)' : '3px solid transparent',
                    }}
                  >
                    <span style={{ fontSize: 11, color: l.hlsReady ? 'var(--forest)' : 'var(--fg-muted)', marginTop: 2, flexShrink: 0 }}>
                      {isActive ? '▶' : l.hlsReady ? '●' : '○'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: isActive ? 'var(--forest)' : 'var(--fg-2)', fontWeight: isActive ? 600 : 400, lineHeight: 1.4 }}>
                        {l.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                        {dur ?? '—'}
                        {l.isFreePreview && <span style={{ marginLeft: 6, color: 'var(--gold-3)' }}>· free</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ))}
        </aside>
      </div>
    </div>
  )
}
