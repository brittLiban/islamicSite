import Link from 'next/link'
import { Mark } from '@/components/ui/mark'

export function TopNav() {
  return (
    <nav className="topnav">
      <div className="topnav__inner">
        <Link href="/" className="topnav__brand">
          <Mark size={38} />
          <span>
            Al-Qarawiyyīn
            <span className="topnav__brand-arabic"> · القرويين</span>
          </span>
        </Link>

        <div className="topnav__links">
          <Link href="/" className="topnav__link">Home</Link>
          <Link href="/courses" className="topnav__link">Courses</Link>
          <Link href="/#about" className="topnav__link">About</Link>
          <Link href="/#contact" className="topnav__link">Contact</Link>
        </div>

        <div className="topnav__actions">
          <Link href="/login" className="btn btn--ghost btn--md">Sign in</Link>
          <Link href="/signup" className="btn btn--primary btn--md">Enroll</Link>
        </div>
      </div>
    </nav>
  )
}
