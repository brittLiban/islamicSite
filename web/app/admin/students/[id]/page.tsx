import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { markConversationRead } from '@/lib/message-actions'
import { adminEnrollStudent, adminUnenrollStudent } from '@/lib/admin-actions'
import { MessageThread } from './MessageThread'

export default async function AdminStudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const adminId = (session.user as { id?: string }).id!
  const { id: studentId } = await params

  const student = await db.user.findUnique({
    where: { id: studentId },
    include: {
      enrollments: {
        include: { course: { select: { id: true, title: true, titleArabic: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!student || student.role === 'admin') notFound()

  // Fetch conversation (both directions)
  const messages = await db.message.findMany({
    where: {
      OR: [
        { fromUserId: adminId, toUserId: studentId },
        { fromUserId: studentId, toUserId: adminId },
      ],
    },
    orderBy: { createdAt: 'asc' },
  })

  // Mark student's messages to admin as read
  await markConversationRead(studentId)

  // All courses for the enrollment form
  const allCourses = await db.course.findMany({
    orderBy: { title: 'asc' },
    select: { id: true, title: true },
  })
  const enrolledCourseIds = new Set(student.enrollments.map((e) => e.courseId))

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--paper-2)' }}>
      {/* Sidebar */}
      <aside style={{ width: 240, background: 'var(--forest-2)', color: 'var(--paper)', flexShrink: 0, display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
          <Link href="/admin" style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--paper)', textDecoration: 'none' }}>
            Al-Qarawiyyīn Admin
          </Link>
        </div>
        <nav style={{ padding: '16px 8px', flex: 1 }}>
          {[
            { label: 'Overview', href: '/admin' },
            { label: 'Courses', href: '/admin/courses' },
            { label: 'Students', href: '/admin/students' },
            { label: 'Coupons', href: '/admin/coupons' },
          ].map((item) => (
            <Link key={item.href} href={item.href} style={{ display: 'block', padding: '9px 12px', color: 'rgba(245,237,216,0.75)', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, marginBottom: 2 }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px', overflow: 'auto', maxWidth: 900 }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/admin/students" style={{ fontSize: 13, color: 'var(--fg-3)', textDecoration: 'none' }}>
            ← Students
          </Link>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 20, marginTop: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--forest)', color: 'var(--gold-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 22, flexShrink: 0 }}>
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 500, margin: 0 }}>
                {student.name}
              </h1>
              <div style={{ fontSize: 14, color: 'var(--fg-3)', marginTop: 2 }}>
                {student.email} · Joined {new Date(student.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {/* Left: enrollments */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: '0 0 16px' }}>
              Enrolled courses
            </h2>

            {student.enrollments.length === 0 ? (
              <div style={{ color: 'var(--fg-3)', fontStyle: 'italic', fontSize: 14 }}>
                Not enrolled in any courses.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {student.enrollments.map((e) => (
                  <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '10px 14px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{e.course.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--fg-3)', marginTop: 2, fontFamily: 'var(--font-mono)' }}>
                        Enrolled {new Date(e.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {e.amountPaidCents === 0 && ' · Gift'}
                      </div>
                    </div>
                    <form action={adminUnenrollStudent.bind(null, studentId, e.courseId)}>
                      <button type="submit" style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: 12, cursor: 'pointer' }}>
                        Remove
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}

            {/* Enroll in a course */}
            {allCourses.filter(c => !enrolledCourseIds.has(c.id)).length > 0 && (
              <>
                <div className="eyebrow" style={{ marginBottom: 8 }}>Enroll in a course</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {allCourses.filter(c => !enrolledCourseIds.has(c.id)).map((course) => (
                    <form key={course.id} action={adminEnrollStudent.bind(null, studentId, course.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--paper)', border: '1px solid var(--border-soft)', borderRadius: 'var(--radius-sm)', padding: '8px 12px' }}>
                      <span style={{ flex: 1, fontSize: 13, color: 'var(--fg-2)' }}>{course.title}</span>
                      <button type="submit" className="btn btn--secondary btn--sm">
                        Enroll free
                      </button>
                    </form>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Right: stats */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: '0 0 16px' }}>
              Activity
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { label: 'Courses enrolled', value: student.enrollments.length },
                { label: 'Messages', value: messages.length },
              ].map((s) => (
                <div key={s.label} className="card" style={{ padding: 16, textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--accent)' }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--fg-3)', fontVariant: 'small-caps', letterSpacing: '0.12em', marginTop: 4 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ marginTop: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: '0 0 16px' }}>
            Messages with {student.name}
          </h2>
          <MessageThread
            messages={messages}
            adminId={adminId}
            studentId={studentId}
            studentName={student.name}
          />
        </div>
      </main>
    </div>
  )
}
