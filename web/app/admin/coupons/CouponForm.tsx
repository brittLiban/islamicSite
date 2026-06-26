'use client'

import { useActionState } from 'react'
import { createCoupon, deleteCoupon } from '@/lib/admin-actions'

type Coupon = { code: string; percentOff: number; maxUses: number; usedCount: number; expiresAt: Date | null }

export function CouponForm({ coupons }: { coupons: Coupon[] }) {
  const [error, action, pending] = useActionState(createCoupon, null)

  return (
    <>
      <div className="card" style={{ padding: 28, maxWidth: 600, marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, margin: '0 0 20px' }}>Create new coupon</h2>
        <form action={action}>
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: 16, color: '#b91c1c', fontSize: 14 }}>
              {error}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
            <div className="field-row">
              <label className="label" htmlFor="code">Coupon code</label>
              <input id="code" name="code" required className="field" placeholder="RAMADAN25" />
            </div>
            <div className="field-row">
              <label className="label" htmlFor="percentOff">Discount (%)</label>
              <input id="percentOff" name="percentOff" type="number" min="1" max="100" required className="field" placeholder="25" />
            </div>
            <div className="field-row">
              <label className="label" htmlFor="maxUses">Max uses</label>
              <input id="maxUses" name="maxUses" type="number" min="1" required className="field" placeholder="100" />
            </div>
            <div className="field-row">
              <label className="label" htmlFor="expiresAt">Expires (optional)</label>
              <input id="expiresAt" name="expiresAt" type="date" className="field" />
            </div>
          </div>
          <button type="submit" disabled={pending} className="btn btn--primary btn--md">
            {pending ? 'Creating…' : 'Create coupon'}
          </button>
        </form>
      </div>

      {/* Coupon table */}
      {coupons.length > 0 && (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--paper-2)' }}>
                {['Code', 'Discount', 'Used / Max', 'Expires', ''].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontFamily: 'var(--font-sc)', fontVariant: 'small-caps', fontSize: 11, letterSpacing: '0.15em', color: 'var(--fg-3)', fontWeight: 600 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c, i) => (
                <tr key={c.code} style={{ borderBottom: i < coupons.length - 1 ? '1px solid var(--border-soft)' : 'none' }}>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{c.code}</td>
                  <td style={{ padding: '11px 16px', color: 'var(--accent)', fontWeight: 600 }}>{c.percentOff}%</td>
                  <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 13 }}>
                    {c.usedCount} / {c.maxUses}
                  </td>
                  <td style={{ padding: '11px 16px', fontSize: 13, color: 'var(--fg-3)' }}>
                    {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td style={{ padding: '11px 16px' }}>
                    <button
                      onClick={() => deleteCoupon(c.code)}
                      style={{ background: 'none', border: 'none', color: 'var(--fg-muted)', cursor: 'pointer', fontSize: 13 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {coupons.length === 0 && (
        <div style={{ color: 'var(--fg-3)', fontStyle: 'italic', fontSize: 14 }}>
          No coupons yet. Create one above.
        </div>
      )}
    </>
  )
}
