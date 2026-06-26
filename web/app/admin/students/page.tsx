import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export default async function AdminStudentsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const students = await db.user.findMany({
    where: { role: 'student' },
    orderBy: { createdAt: 'desc' },
    take: 200,
    include: {
      _count: { select: { enrollments: true, messagesReceived: true } },
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
            <Link key={item.href} href={item.href} style={{ display: 'block', padding: '9px 12px', color: item.href === '/admin/students' ? 'var(--gold-2)' : 'rgba(245,237,216,0.75)', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, marginBottom: 2, background: item.href === '/admin/students' ? 'rgba(255,255,255,0.07)' : 'transparent' }}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '40px 48px' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Students</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, margin: 0 }}>
            {students.length} student{students.length !== 1 ? 's' : ''}
          </h1>
        </div>

        <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {students.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center', color: 'var(--fg-3)', fontStyle: 'italic' }}>
              No students yet. Share the link and watch them arrive.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper-2)' }}>
                  {['Name', 'Email', 'Courses', 'Joined', ''].map((h) => (
                    <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-sc)', fontVariant: 'small-caps', fontSize: 11, letterSpacing: '0.15em', color: 'var(--fg-3)', fontWeight: 600 }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} style={{ borderBottom: i < students.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                    <td style={{ padding: '11px 16px', fontWeight: 500 }}>
                      <Link href={`/admin/students/${s.id}`} style={{ color: 'var(--ink)', textDecoration: 'none' }}>
                        {s.name}
                      </Link>
                    </td>
                    <td style={{ padding: '11px 16px', color: 'var(--fg-3)' }}>{s.email}</td>
                    <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                      {s._count.enrollments}
                    </td>
                    <td style={{ padding: '11px 16px', color: 'var(--fg-3)', fontSize: 12 }}>
                      {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '11px 16px' }}>
                      <Link
                        href={`/admin/students/${s.id}`}
                        style={{ fontSize: 13, color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  )
}
