import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { Mark } from '@/components/ui/mark'
import { courses as staticCourses, instructor } from '@/lib/data'
import { logout } from '@/lib/actions'
import { db } from '@/lib/db'

export default async function AdminPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const dbCourses = await db.course.findMany({
    orderBy: { createdAt: 'asc' },
    include: { category: true, _count: { select: { enrollments: true } } },
  })
  const courses = dbCourses.length > 0 ? dbCourses : staticCourses.map((c) => ({
    id: c.id, title: c.title, titleArabic: c.arabic, slug: c.slug,
    priceCents: c.price * 100, isPublished: true,
    category: { label: c.catLabel }, _count: { enrollments: c.students },
    studentsCountDenorm: c.students, ratingDenorm: c.rating,
  }))
  const totalStudents = courses.reduce((acc, c) => acc + ('_count' in c ? c._count.enrollments : (c as { students: number }).students), 0)
  const totalRevenueCents = dbCourses.reduce((acc, c) => acc + c.priceCents * (c._count?.enrollments ?? 0), 0)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--paper-2)' }}>

      {/* Sidebar */}
      <aside style={{
        width: 240,
        background: 'var(--forest-2)',
        color: 'var(--paper)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'auto',
      }}>
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mark size={32} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, color: 'var(--paper)', lineHeight: 1.1 }}>
                Al-Qarawiyyīn
              </div>
              <div style={{ fontSize: 10, color: 'var(--gold-2)', fontVariant: 'small-caps', letterSpacing: '0.15em' }}>
                Admin
              </div>
            </div>
          </div>
        </div>

        <nav style={{ padding: '16px 8px', flex: 1 }}>
          {[
            { label: 'Overview', href: '/admin' },
            { label: 'Courses', href: '/admin/courses' },
            { label: 'Students', href: '/admin/students' },
            { label: 'Revenue', href: '/admin/revenue' },
            { label: 'Coupons', href: '/admin/coupons' },
            { label: 'Testimonials', href: '/admin/testimonials' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '9px 12px',
                color: 'rgba(245,237,216,0.75)',
                textDecoration: 'none',
                borderRadius: 'var(--radius-sm)',
                fontSize: 14,
                marginBottom: 2,
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(220,182,94,0.1)' }}>
          <div style={{ fontSize: 13, color: 'rgba(245,237,216,0.55)', marginBottom: 8 }}>
            {session.user.email}
          </div>
          <form action={logout}>
            <button type="submit" style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(245,237,216,0.5)',
              fontSize: 13,
              cursor: 'pointer',
              padding: 0,
            }}>
              Sign out
            </button>
          </form>
          <Link href="/" style={{ display: 'block', marginTop: 8, fontSize: 13, color: 'rgba(245,237,216,0.5)', textDecoration: 'none' }}>
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: '40px 48px', overflow: 'auto' }}>
        <div style={{ marginBottom: 40 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Overview</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, margin: 0 }}>
            Academy dashboard
          </h1>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 48 }}>
          {[
            { label: 'Total students', value: totalStudents.toLocaleString(), sub: 'across all courses' },
            { label: 'Active courses', value: dbCourses.filter(c => c.isPublished).length || staticCourses.length, sub: 'published' },
            { label: 'Est. revenue', value: `$${Math.round(totalRevenueCents / 100).toLocaleString()}`, sub: 'lifetime (enrolled)' },
            { label: 'Avg. rating', value: staticCourses.length > 0 ? (staticCourses.reduce((a, c) => a + c.rating, 0) / staticCourses.length).toFixed(1) : '—', sub: 'out of 5.0' },
          ].map((s) => (
            <div key={s.label} className="card">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: 'var(--accent)', marginBottom: 4 }}>
                {s.value}
              </div>
              <div className="eyebrow" style={{ marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: 'var(--fg-3)', fontStyle: 'italic' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Courses table */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: 0 }}>
              Courses
            </h2>
            <Link href="/admin/courses/new" className="btn btn--primary btn--sm" style={{ textDecoration: 'none' }}>
              + New course
            </Link>
          </div>
          <div style={{
            background: 'var(--paper)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper-2)' }}>
                  {['Course', 'Category', 'Lessons', 'Students', 'Rating', 'Price', ''].map((h) => (
                    <th key={h} style={{
                      padding: '10px 16px',
                      textAlign: 'left',
                      fontFamily: 'var(--font-sc)',
                      fontVariant: 'small-caps',
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      color: 'var(--fg-3)',
                      fontWeight: 600,
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {staticCourses.map((c, i) => (
                  <tr key={c.id} style={{ borderBottom: i < staticCourses.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 500 }}>{c.title}</div>
                      <div style={{ fontFamily: 'var(--font-arabic)', fontSize: 12, color: 'var(--gold-3)', direction: 'rtl', textAlign: 'left' }}>
                        {c.arabic}
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--fg-3)' }}>{c.catLabel}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{c.lessons}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>{c.students.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ color: 'var(--gold-3)', marginRight: 3 }}>★</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{c.rating}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--accent)' }}>
                      ${c.price}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <Link href={`/courses/${c.slug}`} style={{ fontSize: 12, color: 'var(--accent)', textDecoration: 'none' }}>
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Instructor info */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 16px' }}>
            Instructor
          </h2>
          <div className="card" style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: 'var(--forest)',
              color: 'var(--gold-2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-arabic)',
              fontSize: 28,
              flexShrink: 0,
            }}>
              ع
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600 }}>{instructor.name}</div>
              <div className="eyebrow" style={{ margin: '4px 0 8px' }}>{instructor.title}</div>
              <div style={{ fontSize: 13, color: 'var(--fg-3)' }}>
                {instructor.courses} courses · {instructor.students.toLocaleString()} students · {instructor.rating} rating
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
