import Link from 'next/link'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { CoursePoster } from '@/components/course/course-poster'
import { courses, categories } from '@/lib/data'

const badgeVariant = (color: string) => {
  if (color === 'gold') return 'badge--gold'
  if (color === 'clay') return 'badge--clay'
  if (color === 'slate') return 'badge--slate'
  return 'badge--forest'
}

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const activeCat = cat ?? 'all'
  const filtered = activeCat === 'all' ? courses : courses.filter((c) => c.cat === activeCat)

  return (
    <>
      <TopNav />

      {/* Page header */}
      <div style={{
        background: 'var(--forest)',
        color: 'var(--paper)',
        padding: '64px 0 56px',
      }}>
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--gold-2)', marginBottom: 16 }}>
            المكتبة · The Library
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: '-0.018em',
            lineHeight: 1.02,
            color: 'var(--paper)',
            margin: '0 0 16px',
          }}>
            Eight courses, <em style={{ color: 'var(--gold-2)', fontStyle: 'italic' }}>one teacher</em>.
          </h1>
          <p style={{
            fontSize: 18,
            color: 'rgba(245,237,216,0.75)',
            fontStyle: 'italic',
            maxWidth: 520,
            margin: 0,
          }}>
            Each course is a complete course of study — recorded lesson by lesson, with transcripts and an oral examination at the end.
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--paper)',
        position: 'sticky',
        top: 64,
        zIndex: 30,
      }}>
        <div className="container" style={{ padding: '14px var(--space-7)' }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
            <span className="eyebrow" style={{ marginRight: 8 }}>Filter:</span>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={c.id === 'all' ? '/courses' : `/courses?cat=${c.id}`}
                className={`chip ${activeCat === c.id ? 'is-active' : ''}`}
                style={{ textDecoration: 'none' }}
              >
                {c.label}
                {c.arabic && (
                  <span style={{ fontFamily: 'var(--font-arabic)', marginLeft: 5, fontSize: 12 }}>
                    {c.arabic}
                  </span>
                )}
              </Link>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic' }}>
              {filtered.length} course{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Course grid */}
      <section className="section">
        <div className="container">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--fg-3)' }}>
              <div style={{ fontFamily: 'var(--font-arabic)', fontSize: 36, marginBottom: 16 }}>
                لا يوجد
              </div>
              <p>No courses in this category yet.</p>
              <Link href="/courses" className="btn btn--secondary btn--md" style={{ marginTop: 16, textDecoration: 'none' }}>
                View all courses
              </Link>
            </div>
          ) : (
            <div className="course-grid">
              {filtered.map((c) => (
                <Link key={c.id} href={`/courses/${c.slug}`} className="course-card" style={{ textDecoration: 'none' }}>
                  <div className="course-card__cover-wrap">
                    <div className="course-card__cover">
                      <CoursePoster course={c} />
                    </div>
                  </div>
                  <div className="course-card__meta">
                    <span className={`badge ${badgeVariant(c.coverColor)}`}>{c.catLabel}</span>
                    <span style={{ fontSize: 11, color: 'var(--fg-3)', fontFamily: 'var(--font-mono)' }}>
                      {c.level}
                    </span>
                  </div>
                  <h3 className="course-card__title">{c.title}</h3>
                  <span className="arabic" style={{ fontSize: 15, color: 'var(--gold-3)', display: 'block', margin: '2px 0 4px' }}>
                    {c.arabic}
                  </span>
                  <span className="course-card__instructor">
                    Sheikh Abdulhakim · {c.lessons} lessons · {c.duration}
                  </span>
                  <div className="course-card__foot">
                    <span style={{ display: 'inline-flex', gap: 1, color: 'var(--gold-3)' }}>
                      {'★'.repeat(Math.floor(c.rating))}
                      <span style={{ color: 'var(--fg-3)', marginLeft: 4, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                        {c.rating.toFixed(1)} ({c.students.toLocaleString()})
                      </span>
                    </span>
                    <span className="course-card__price">${c.price}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <div style={{
        background: 'var(--paper-2)',
        borderTop: '1px solid var(--border-soft)',
        padding: '64px 0',
        textAlign: 'center',
      }}>
        <div className="container container--prose">
          <div className="arabic" style={{ fontSize: 28, color: 'var(--gold-3)', marginBottom: 8 }}>
            وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا
          </div>
          <div className="meta" style={{ marginBottom: 28 }}>
            "And whoever has taqwā of Allah — He will make a way out for him." — Sūrat al-Ṭalāq, 65:2
          </div>
          <Link href="/signup" className="btn btn--primary btn--lg" style={{ textDecoration: 'none' }}>
            Begin your studies
          </Link>
        </div>
      </div>

      <Footer />
    </>
  )
}
