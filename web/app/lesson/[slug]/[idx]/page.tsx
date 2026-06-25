import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { Mark } from '@/components/ui/mark'
import { courses, curricula } from '@/lib/data'

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; idx: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const { slug, idx } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const modules = curricula[slug] ?? []
  const allLessons = modules.flatMap((m, mi) =>
    m.lessons.map((l, li) => ({ ...l, moduleTitle: m.title, moduleIdx: mi, lessonIdx: li }))
  )

  const lessonIdx = Math.max(0, parseInt(idx, 10) - 1)
  const lesson = allLessons[lessonIdx] ?? allLessons[0]
  const prevLesson = lessonIdx > 0 ? allLessons[lessonIdx - 1] : null
  const nextLesson = lessonIdx < allLessons.length - 1 ? allLessons[lessonIdx + 1] : null

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
            {course.title}
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 16,
            color: 'var(--paper)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {lesson?.title ?? 'Lesson'}
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
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                color: 'rgba(245,237,216,0.5)',
                fontStyle: 'italic',
              }}>
                Video coming soon
              </div>
              <div style={{ fontSize: 13, color: 'rgba(245,237,216,0.3)', marginTop: 8 }}>
                {lesson?.duration}
              </div>
            </div>
          </div>

          {/* Lesson info + navigation */}
          <div style={{ padding: '28px 32px', background: 'var(--paper)', flex: 1 }}>
            <div style={{ maxWidth: 800 }}>
              <div className="eyebrow" style={{ marginBottom: 8 }}>{lesson?.moduleTitle}</div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 30,
                fontWeight: 500,
                margin: '0 0 16px',
              }}>
                {lesson?.title ?? 'Lesson'}
              </h1>
              <p style={{ color: 'var(--fg-2)', fontStyle: 'italic', lineHeight: 1.7, marginBottom: 28 }}>
                This lesson is part of {course.title}. Lesson notes and transcript will appear here once the video has been watched.
              </p>

              {/* Nav buttons */}
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
                    This is the last lesson. Well done — may Allah accept it from you.
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
              {mod.lessons.map((l, li) => {
                const globalIdx = modules.slice(0, mi).reduce((acc, m) => acc + m.lessons.length, 0) + li
                const isActive = globalIdx === lessonIdx
                return (
                  <Link
                    key={li}
                    href={`/lesson/${slug}/${globalIdx + 1}`}
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
                    <span style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, flexShrink: 0 }}>
                      {isActive ? '▶' : '○'}
                    </span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: 13,
                        color: isActive ? 'var(--forest)' : 'var(--fg-2)',
                        fontWeight: isActive ? 600 : 400,
                        lineHeight: 1.4,
                      }}>
                        {l.title}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--fg-muted)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                        {l.duration}
                        {l.free && <span style={{ marginLeft: 6, color: 'var(--gold-3)' }}>· free</span>}
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
