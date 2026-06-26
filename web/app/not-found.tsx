import Link from 'next/link'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'

export default function NotFound() {
  return (
    <>
      <TopNav />
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px var(--space-7)',
      }}>
        <div className="arabic" style={{ fontSize: 72, color: 'var(--gold-3)', lineHeight: 1, marginBottom: 8 }}>
          ٤٠٤
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 48,
          fontWeight: 500,
          letterSpacing: '-0.015em',
          margin: '0 0 12px',
        }}>
          Page not found
        </h1>
        <p style={{ color: 'var(--fg-3)', fontStyle: 'italic', maxWidth: 420, margin: '0 0 32px' }}>
          The page you are looking for does not exist, or may have moved. Return to the library and continue your studies.
        </p>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/" className="btn btn--primary btn--lg" style={{ textDecoration: 'none' }}>
            Go home
          </Link>
          <Link href="/courses" className="btn btn--secondary btn--lg" style={{ textDecoration: 'none' }}>
            Browse courses
          </Link>
        </div>
      </div>
      <Footer />
    </>
  )
}
