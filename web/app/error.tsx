'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px var(--space-7)',
      background: 'var(--paper)',
    }}>
      <div className="arabic" style={{ fontSize: 48, color: 'var(--gold-3)', marginBottom: 8 }}>
        خطأ
      </div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 40,
        fontWeight: 500,
        margin: '0 0 12px',
      }}>
        Something went wrong
      </h1>
      <p style={{ color: 'var(--fg-3)', fontStyle: 'italic', maxWidth: 400, margin: '0 0 32px' }}>
        An unexpected error occurred. Please try again, or return home.
      </p>
      {error.digest && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-muted)', marginBottom: 28 }}>
          Error ID: {error.digest}
        </p>
      )}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={reset} className="btn btn--primary btn--lg">
          Try again
        </button>
        <Link href="/" className="btn btn--secondary btn--lg" style={{ textDecoration: 'none' }}>
          Go home
        </Link>
      </div>
    </div>
  )
}
