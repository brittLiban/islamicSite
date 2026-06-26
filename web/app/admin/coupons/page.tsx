import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { CouponForm } from './CouponForm'

export default async function AdminCouponsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')
  if ((session.user as { role?: string }).role !== 'admin') redirect('/dashboard')

  const coupons = await db.coupon.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--paper-2)' }}>
      <aside style={{ width: 240, background: 'var(--forest-2)', color: 'var(--paper)', flexShrink: 0, padding: '20px 8px' }}>
        <div style={{ padding: '0 12px 16px', borderBottom: '1px solid rgba(220,182,94,0.15)', marginBottom: 16 }}>
          <Link href="/admin" style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--paper)', textDecoration: 'none' }}>
            Al-Qarawiyyīn Admin
          </Link>
        </div>
        {[
          { label: 'Overview', href: '/admin' },
          { label: 'Students', href: '/admin/students' },
          { label: 'Coupons', href: '/admin/coupons' },
        ].map((item) => (
          <Link key={item.href} href={item.href} style={{ display: 'block', padding: '9px 12px', color: 'rgba(245,237,216,0.75)', textDecoration: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, marginBottom: 2 }}>
            {item.label}
          </Link>
        ))}
      </aside>

      <main style={{ flex: 1, padding: '40px 48px' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow" style={{ marginBottom: 8 }}>Coupons</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, margin: 0 }}>Discount codes</h1>
        </div>
        <CouponForm coupons={coupons} />
      </main>
    </div>
  )
}
