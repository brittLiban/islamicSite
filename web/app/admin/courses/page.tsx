import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { CourseActions } from './CourseActions'

export default async function AdminCoursesPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const courses = await db.course.findMany({
    orderBy: { createdAt: 'asc' },
    include: {
      category: true,
      _count: { select: { enrollments: true } },
      modules: { include: { _count: { select: { lessons: true } } } },
    },
  })

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
            <Link key={item.href} href={item.href} style={{ display: 'block', padding: '9px 12px', color: item.href === '/admin/courses' ? 'var(--gold-2)' : 'rgba(245,237,216,0.75)', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, marginBottom: 2, background: item.href === '/admin/courses' ? 'rgba(255,255,255,0.07)' : 'transparent' }}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(220,182,94,0.1)' }}>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(245,237,216,0.5)', textDecoration: 'none' }}>← Back to site</Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px 48px', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Curriculum</div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, margin: 0 }}>
              Courses
            </h1>
          </div>
          <Link href="/admin/courses/new" className="btn btn--primary btn--md" style={{ textDecoration: 'none' }}>
            + New course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--fg-3)', fontStyle: 'italic', border: '1px dashed var(--border)', borderRadius: 'var(--radius-md)' }}>
            No courses yet.{' '}
            <Link href="/admin/courses/new" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
              Create the first one.
            </Link>
          </div>
        ) : (
          <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper-2)' }}>
                  {['Course', 'Category', 'Lessons', 'Students', 'Price', 'Actions'].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-sc)', fontVariant: 'small-caps', fontSize: 11, letterSpacing: '0.15em', color: 'var(--fg-3)', fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => {
                  const lessonCount = course.modules.reduce((acc, m) => acc + m._count.lessons, 0)
                  return (
                    <tr key={course.id} style={{ borderBottom: i < courses.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ fontWeight: 600 }}>{course.title}</div>
                        <div style={{ fontFamily: 'var(--font-arabic)', fontSize: 12, color: 'var(--gold-3)', direction: 'rtl', textAlign: 'left' }}>
                          {course.titleArabic}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                          /{course.slug}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--fg-3)' }}>{course.category.label}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{lessonCount}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                        {course._count.enrollments.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--accent)' }}>
                        ${(course.priceCents / 100).toFixed(0)}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <CourseActions
                          courseId={course.id}
                          courseTitle={course.title}
                          slug={course.slug}
                          isPublished={course.isPublished}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}
