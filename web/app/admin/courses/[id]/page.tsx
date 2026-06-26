import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { CourseEditForm } from './CourseEditForm'
import { ModuleManager } from './ModuleManager'

export default async function AdminCourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const { id } = await params
  const course = await db.course.findUnique({
    where: { id },
    include: {
      category: true,
      modules: {
        orderBy: { sortOrder: 'asc' },
        include: { lessons: { orderBy: { sortOrder: 'asc' } } },
      },
    },
  })
  if (!course) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper-2)' }}>
      {/* Header */}
      <div style={{ background: 'var(--forest-2)', color: 'var(--paper)', padding: '20px 48px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Link href="/admin" style={{ color: 'rgba(245,237,216,0.5)', textDecoration: 'none', fontSize: 14 }}>
              ← Admin
            </Link>
            <span style={{ color: 'rgba(245,237,216,0.3)' }}>›</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, color: 'var(--paper)' }}>
              {course.title}
            </span>
            {course.isPublished && (
              <span className="badge badge--gold">Published</span>
            )}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            target="_blank"
            style={{ fontSize: 13, color: 'rgba(245,237,216,0.5)', textDecoration: 'none' }}
          >
            View live →
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        {/* Course edit form */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 20px' }}>
            Course details
          </h2>
          <CourseEditForm course={course} />
        </section>

        {/* Module + lesson manager */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 20px' }}>
            Curriculum
          </h2>
          <ModuleManager courseId={course.id} modules={course.modules} />
        </section>
      </div>
    </div>
  )
}
