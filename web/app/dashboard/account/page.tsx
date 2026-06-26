import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { ProfileForm } from './ProfileForm'
import { PasswordForm } from './PasswordForm'

export default async function AccountPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <>
      <TopNav />

      <div style={{ background: 'var(--forest)', padding: '40px 0 36px', borderBottom: '1px solid rgba(220,182,94,0.15)' }}>
        <div className="container">
          <nav style={{ fontSize: 13, marginBottom: 16 }}>
            <Link href="/dashboard" style={{ color: 'rgba(245,237,216,0.5)', textDecoration: 'none' }}>Dashboard</Link>
            <span style={{ color: 'rgba(245,237,216,0.3)', margin: '0 8px' }}>›</span>
            <span style={{ color: 'rgba(245,237,216,0.8)' }}>Account settings</span>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, color: 'var(--paper)', margin: 0 }}>
            Account settings
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>
        <div style={{ maxWidth: 600 }}>

          {/* Profile section */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 20px' }}>
              Profile
            </h2>
            <div className="card" style={{ padding: 28 }}>
              <div style={{ marginBottom: 20, fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic' }}>
                Signed in as <strong style={{ color: 'var(--fg-2)', fontStyle: 'normal' }}>{session.user.email}</strong>
              </div>
              <ProfileForm name={session.user.name ?? ''} />
            </div>
          </section>

          {/* Password section */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 20px' }}>
              Change password
            </h2>
            <div className="card" style={{ padding: 28 }}>
              <PasswordForm />
            </div>
          </section>

          {/* Danger zone */}
          <section>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 500, margin: '0 0 20px', color: '#b91c1c' }}>
              Danger zone
            </h2>
            <div className="card" style={{ padding: 28, borderColor: '#fecaca' }}>
              <p style={{ fontSize: 14, color: 'var(--fg-2)', marginBottom: 16 }}>
                Deleting your account is permanent and cannot be undone. All progress, notes, and certificates will be lost.
              </p>
              <button className="btn btn--ghost btn--md" style={{ color: '#b91c1c', borderColor: '#fecaca' }} disabled>
                Delete account (contact support)
              </button>
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </>
  )
}
