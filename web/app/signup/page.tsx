'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { Mark } from '@/components/ui/mark'
import { signup } from '@/lib/actions'

export default function SignupPage() {
  const [error, action, pending] = useActionState(signup, null)

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--forest)',
      padding: '32px 16px',
    }}>
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='56'><g stroke='%23DCB65E' stroke-width='0.4' fill='none' opacity='0.08'><polygon points='28,8 31,23 46,23 34,31 39,46 28,38 17,46 22,31 10,23 25,23'/></g></svg>")`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', maxWidth: 460 }}>
        <div style={{
          background: 'var(--paper)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--forest-2)',
            borderBottom: '1px solid rgba(220,182,94,0.2)',
            padding: '28px 32px 24px',
            textAlign: 'center',
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
              <Mark size={48} />
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--paper)',
              fontWeight: 500,
              marginBottom: 4,
            }}>
              Begin where you are
            </div>
            <div className="arabic" style={{ fontSize: 16, color: 'var(--gold-2)' }}>
              ابدأ من حيث أنت
            </div>
          </div>

          {/* Form */}
          <form action={action} style={{ padding: '32px' }}>
            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                fontSize: 14,
                color: '#b91c1c',
                marginBottom: 20,
              }}>
                {error}
              </div>
            )}

            <div className="field-row" style={{ marginBottom: 16 }}>
              <label className="label" htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="field"
                placeholder="Your name"
              />
            </div>

            <div className="field-row" style={{ marginBottom: 16 }}>
              <label className="label" htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="field"
                placeholder="you@example.com"
              />
            </div>

            <div className="field-row" style={{ marginBottom: 24 }}>
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="field"
                placeholder="At least 8 characters"
              />
            </div>

            <button
              type="submit"
              disabled={pending}
              className="btn btn--primary btn--lg"
              style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
            >
              {pending ? 'Creating account…' : 'Create account'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--fg-3)', margin: 0 }}>
              By enrolling you agree to our{' '}
              <Link href="/terms" style={{ color: 'var(--fg-3)' }}>Terms</Link>
              {' & '}
              <Link href="/privacy" style={{ color: 'var(--fg-3)' }}>Privacy Policy</Link>.
            </p>
          </form>

          <div style={{
            borderTop: '1px solid var(--border-soft)',
            padding: '16px 32px',
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--fg-3)',
          }}>
            Already enrolled?{' '}
            <Link href="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>
              Sign in
            </Link>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href="/" style={{ fontSize: 13, color: 'rgba(245,237,216,0.6)', textDecoration: 'none' }}>
            ← Back to Al-Qarawiyyīn Academy
          </Link>
        </div>
      </div>
    </div>
  )
}
