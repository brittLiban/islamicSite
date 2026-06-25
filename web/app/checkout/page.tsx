import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { CoursePoster } from '@/components/course/course-poster'
import { courses } from '@/lib/data'

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ course?: string }>
}) {
  const { course: slug } = await searchParams
  const course = slug ? courses.find((c) => c.slug === slug) : null
  if (!course) notFound()

  return (
    <>
      <TopNav />

      <div className="container" style={{ paddingTop: 64, paddingBottom: 80 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 16 }}>Secure checkout</div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 40,
            fontWeight: 500,
            margin: '0 0 40px',
          }}>
            Complete your enrollment
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 40, alignItems: 'start' }}>

            {/* Left — payment form */}
            <div>
              <div className="card" style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, margin: '0 0 20px' }}>
                  Payment details
                </h2>

                <div style={{
                  background: 'var(--paper-2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '40px 24px',
                  textAlign: 'center',
                  color: 'var(--fg-3)',
                }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>💳</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, marginBottom: 8, color: 'var(--ink)' }}>
                    Stripe payments coming soon
                  </div>
                  <p style={{ margin: 0, fontStyle: 'italic', fontSize: 14 }}>
                    Payment processing via Stripe will be integrated in the next phase.
                    For now, contact Sheikh Abdulhakim directly to enroll.
                  </p>
                </div>

                <div style={{ marginTop: 24 }}>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="btn btn--secondary btn--md"
                    style={{ textDecoration: 'none' }}
                  >
                    ← Back to course
                  </Link>
                </div>
              </div>
            </div>

            {/* Right — order summary */}
            <div style={{ position: 'sticky', top: 88 }}>
              <div className="card card--frame" style={{ padding: 24 }}>
                <div className="eyebrow" style={{ marginBottom: 16 }}>Order summary</div>

                <div style={{ marginBottom: 20 }}>
                  <CoursePoster course={course} height={140} showPlay={false} />
                </div>

                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
                  {course.title}
                </div>
                <div className="arabic" style={{ fontSize: 14, color: 'var(--gold-3)', marginBottom: 16 }}>
                  {course.arabic}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: 'var(--fg-3)',
                  marginBottom: 8,
                }}>
                  <span>Course price</span>
                  <span>${course.price}.00</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  color: 'var(--fg-3)',
                  marginBottom: 16,
                }}>
                  <span>Discount</span>
                  <span>—</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'var(--accent)',
                  borderTop: '1px solid var(--border)',
                  paddingTop: 16,
                }}>
                  <span>Total</span>
                  <span>${course.price}.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
