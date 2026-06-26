import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { CoursePoster } from '@/components/course/course-poster'
import { courses } from '@/lib/data'
import { logout } from '@/lib/actions'
import { db } from '@/lib/db'

const enrolled = courses.filter((c) => c.enrolled)

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = (session.user as { id?: string }).id
  const unreadCount = userId ? await db.message.count({
    where: { toUserId: userId, readAt: null },
  }) : 0

  return (
    <>
      <TopNav />

      {/* Dashboard header */}
      <div style={{
        background: 'var(--forest)',
        color: 'var(--paper)',
        padding: '48px 0 40px',
        borderBottom: '1px solid rgba(220,182,94,0.15)',
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <div className="eyebrow" style={{ color: 'var(--gold-2)', marginBottom: 8 }}>
                My dashboard
              </div>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 40,
                fontWeight: 500,
                color: 'var(--paper)',
                margin: 0,
              }}>
                {session.user.name}
              </h1>
              <div style={{ fontSize: 14, color: 'rgba(245,237,216,0.6)', marginTop: 6 }}>
                {session.user.email}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Link
                href="/dashboard/messages"
                className="btn btn--ghost btn--sm"
                style={{ color: 'rgba(245,237,216,0.7)', textDecoration: 'none', position: 'relative' }}
              >
                Messages
                {unreadCount > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: -6,
                    right: -6,
                    background: 'var(--gold)',
                    color: 'var(--forest-2)',
                    borderRadius: '50%',
                    width: 18,
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 700,
                  }}>
                    {unreadCount}
                  </span>
                )}
              </Link>
              <Link href="/dashboard/account" className="btn btn--ghost btn--sm" style={{ color: 'rgba(245,237,216,0.6)', textDecoration: 'none' }}>
                Account
              </Link>
              <form action={logout}>
                <button type="submit" className="btn btn--ghost btn--sm" style={{ color: 'rgba(245,237,216,0.6)' }}>
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper-2)' }}>
        <div className="container" style={{ padding: '18px var(--space-7)' }}>
          <div style={{ display: 'flex', gap: 40 }}>
            {[
              { label: 'Enrolled courses', value: enrolled.length },
              { label: 'Lessons completed', value: 14 },
              { label: 'Certificates earned', value: 0 },
              { label: 'Unread messages', value: unreadCount },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--accent)' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 11, color: 'var(--fg-3)', fontVariant: 'small-caps', letterSpacing: '0.14em', marginTop: 2 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* Continue learning */}
        {enrolled.some((c) => c.progress && c.progress > 0 && c.progress < 1) && (
          <section style={{ marginBottom: 56 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, margin: 0 }}>
                Continue learning
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {enrolled
                .filter((c) => c.progress && c.progress > 0 && c.progress < 1)
                .map((c) => (
                  <div key={c.id} className="card" style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ height: 160, overflow: 'hidden' }}>
                      <CoursePoster course={c} height={160} showPlay={false} />
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
                        {c.title}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--fg-3)', fontStyle: 'italic', marginBottom: 12 }}>
                        {Math.round((c.progress ?? 0) * 100)}% complete
                      </div>
                      {/* Progress bar */}
                      <div style={{
                        height: 4,
                        background: 'var(--paper-3)',
                        borderRadius: 2,
                        marginBottom: 14,
                        overflow: 'hidden',
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.round((c.progress ?? 0) * 100)}%`,
                          background: 'var(--forest)',
                          borderRadius: 2,
                        }} />
                      </div>
                      <Link
                        href={`/lesson/${c.slug}/1`}
                        className="btn btn--primary btn--sm"
                        style={{ textDecoration: 'none' }}
                      >
                        Continue →
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* All enrolled courses */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, margin: 0 }}>
              My courses
            </h2>
            <Link href="/courses" style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none' }}>
              Browse more →
            </Link>
          </div>

          {enrolled.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '64px 32px',
              border: '1px dashed var(--border)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--fg-3)',
            }}>
              <div className="arabic" style={{ fontSize: 32, marginBottom: 12 }}>
                اطلبوا العلم
              </div>
              <p style={{ marginBottom: 20 }}>You have not enrolled in any courses yet.</p>
              <Link href="/courses" className="btn btn--primary btn--md" style={{ textDecoration: 'none' }}>
                Explore courses
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
              {enrolled.map((c) => (
                <Link key={c.id} href={`/lesson/${c.slug}/1`} className="course-card" style={{ textDecoration: 'none' }}>
                  <div className="course-card__cover-wrap">
                    <div className="course-card__cover">
                      <CoursePoster course={c} />
                    </div>
                  </div>
                  <h3 className="course-card__title">{c.title}</h3>
                  <span className="course-card__instructor">
                    {c.lessons} lessons · {c.duration}
                  </span>
                  {c.progress !== undefined && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--fg-3)', marginBottom: 4 }}>
                        <span>Progress</span>
                        <span>{Math.round(c.progress * 100)}%</span>
                      </div>
                      <div style={{ height: 3, background: 'var(--paper-3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: `${Math.round(c.progress * 100)}%`,
                          background: 'var(--forest)',
                          borderRadius: 2,
                        }} />
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Certificates */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 500, margin: '0 0 20px' }}>
            Certificates (Ijazah)
          </h2>
          <div style={{
            textAlign: 'center',
            padding: '48px 32px',
            border: '1px dashed var(--border)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--fg-3)',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📜</div>
            <p style={{ margin: 0, fontStyle: 'italic' }}>
              Complete a course and pass the oral examination to earn your ijazah.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
