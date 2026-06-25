import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { CoursePoster } from '@/components/course/course-poster'
import { Divider } from '@/components/ui/divider'
import { courses, curricula, instructor } from '@/lib/data'
import { CurriculumAccordion } from './CurriculumAccordion'

const badgeVariant = (color: string) => {
  if (color === 'gold') return 'badge--gold'
  if (color === 'clay') return 'badge--clay'
  if (color === 'slate') return 'badge--slate'
  return 'badge--forest'
}

export async function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }))
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const course = courses.find((c) => c.slug === slug)
  if (!course) notFound()

  const modules = curricula[slug] ?? []
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)

  const includes = [
    `${totalLessons || course.lessons} lessons`,
    course.duration + ' self-paced',
    'Full transcripts',
    'Lesson notes & resources',
    'Final oral examination',
    'Ijazah upon completion',
  ]

  const outcomes = [
    'Master the foundational principles of this discipline',
    'Read and understand classical Arabic source texts',
    'Apply the knowledge in daily worship and study',
    'Receive a certificate signed by Sheikh Abdulhakim',
  ]

  return (
    <>
      <TopNav />

      {/* Hero */}
      <div style={{ background: 'var(--forest)', color: 'var(--paper)', padding: '64px 0 56px' }}>
        <div className="container">
          {/* Breadcrumb */}
          <nav style={{ marginBottom: 24, fontSize: 13 }}>
            <Link href="/courses" style={{ color: 'rgba(245,237,216,0.6)', textDecoration: 'none' }}>
              Courses
            </Link>
            <span style={{ color: 'rgba(245,237,216,0.4)', margin: '0 8px' }}>›</span>
            <span style={{ color: 'rgba(245,237,216,0.8)' }}>{course.title}</span>
          </nav>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 56, alignItems: 'start' }}>
            {/* Left — course info */}
            <div>
              <span className={`badge ${badgeVariant(course.coverColor)}`} style={{ marginBottom: 16, display: 'inline-block' }}>
                {course.catLabel}
              </span>
              <h1 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 52,
                fontWeight: 500,
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
                color: 'var(--paper)',
                margin: '0 0 8px',
              }}>
                {course.title}
              </h1>
              <div className="arabic" style={{ fontSize: 24, color: 'var(--gold-2)', marginBottom: 20 }}>
                {course.arabic}
              </div>
              <p style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: 'rgba(245,237,216,0.8)',
                fontStyle: 'italic',
                maxWidth: 560,
                margin: '0 0 24px',
              }}>
                {course.lede ?? course.blurb}
              </p>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                {[
                  { label: 'Students', value: course.students.toLocaleString() },
                  { label: 'Lessons', value: String(course.lessons) },
                  { label: 'Duration', value: course.duration },
                  { label: 'Level', value: course.level },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--gold-2)' }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: 11, color: 'rgba(245,237,216,0.55)', fontVariant: 'small-caps', letterSpacing: '0.15em', marginTop: 2 }}>
                      {s.label}
                    </div>
                  </div>
                ))}
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: 'var(--gold-2)' }}>
                      {course.rating.toFixed(1)}
                    </span>
                    <span style={{ color: 'var(--gold-3)', fontSize: 16 }}>★</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(245,237,216,0.55)', fontVariant: 'small-caps', letterSpacing: '0.15em', marginTop: 2 }}>
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Right — poster */}
            <div style={{ maxWidth: 420 }}>
              <CoursePoster course={course} height={280} />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 56, alignItems: 'start' }}>

          {/* Left — content */}
          <div>
            {/* What you'll learn */}
            <section style={{ marginBottom: 56 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 500,
                marginBottom: 20,
              }}>
                What you will learn
              </h2>
              <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px 28px',
                background: 'var(--paper)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px 24px',
              }}>
                {outcomes.map((o, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--forest)', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.5 }}>{o}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Curriculum */}
            {modules.length > 0 && (
              <section style={{ marginBottom: 56 }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 32,
                  fontWeight: 500,
                  marginBottom: 20,
                }}>
                  Curriculum
                </h2>
                <CurriculumAccordion modules={modules} />
              </section>
            )}

            {/* About the instructor */}
            <section>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 32,
                fontWeight: 500,
                marginBottom: 20,
              }}>
                About the instructor
              </h2>
              <div style={{
                display: 'flex',
                gap: 20,
                alignItems: 'flex-start',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                background: 'var(--paper)',
              }}>
                <div style={{
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: 'var(--forest)',
                  color: 'var(--gold-2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-arabic)',
                  fontSize: 32,
                  flexShrink: 0,
                }}>
                  ع
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, marginBottom: 4 }}>
                    {instructor.name}
                  </div>
                  <div className="eyebrow" style={{ marginBottom: 12 }}>{instructor.title}</div>
                  <p style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.7, margin: 0 }}>
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right — sticky enroll card */}
          <div style={{ position: 'sticky', top: 88 }}>
            <div className="card card--frame" style={{ padding: 28 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 40,
                fontWeight: 700,
                color: 'var(--accent)',
                marginBottom: 4,
              }}>
                ${course.price}
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic', marginBottom: 20 }}>
                One-time payment · Lifetime access
              </div>

              <Link
                href={`/checkout?course=${course.slug}`}
                className="btn btn--primary btn--lg"
                style={{ width: '100%', textDecoration: 'none', marginBottom: 10, justifyContent: 'center' }}
              >
                Enroll now
              </Link>
              <Link
                href="/signup"
                className="btn btn--secondary btn--md"
                style={{ width: '100%', textDecoration: 'none', justifyContent: 'center' }}
              >
                Create free account
              </Link>

              <hr style={{ border: 0, borderTop: '1px solid var(--border-soft)', margin: '20px 0' }} />

              <div className="eyebrow" style={{ marginBottom: 12 }}>This course includes</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {includes.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'var(--fg-2)', alignItems: 'center' }}>
                    <span style={{ color: 'var(--forest)', fontWeight: 700 }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              {course.somali && (
                <>
                  <hr style={{ border: 0, borderTop: '1px solid var(--border-soft)', margin: '20px 0' }} />
                  <div style={{ fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic' }}>
                    Taught in English · Arabic text throughout
                    {course.somali && ' · Somali translation available'}
                  </div>
                </>
              )}
            </div>

            {/* Guarantee note */}
            <div style={{
              marginTop: 16,
              padding: '14px 18px',
              background: 'var(--paper-2)',
              border: '1px solid var(--border-soft)',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              color: 'var(--fg-3)',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              30-day satisfaction guarantee · No questions asked
            </div>
          </div>
        </div>
      </div>

      <div style={{ margin: '0 auto 48px', maxWidth: 320 }}>
        <Divider />
      </div>
      <Footer />
    </>
  )
}
