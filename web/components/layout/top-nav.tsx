'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mark } from '@/components/ui/mark'

export function TopNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="topnav" style={{ position: 'relative' }}>
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

        <button
          className="topnav__hamburger"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <span style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ opacity: open ? 0 : 1 }} />
          <span style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`topnav__mobile ${open ? 'is-open' : ''}`}>
        <Link href="/" className="topnav__link" onClick={() => setOpen(false)}>Home</Link>
        <Link href="/courses" className="topnav__link" onClick={() => setOpen(false)}>Courses</Link>
        <Link href="/#about" className="topnav__link" onClick={() => setOpen(false)}>About</Link>
        <Link href="/#contact" className="topnav__link" onClick={() => setOpen(false)}>Contact</Link>
        <div className="topnav__mobile-actions">
          <Link href="/login" className="btn btn--ghost btn--md" onClick={() => setOpen(false)}>Sign in</Link>
          <Link href="/signup" className="btn btn--primary btn--md" onClick={() => setOpen(false)}>Enroll</Link>
        </div>
      </div>
    </nav>
  )
}
