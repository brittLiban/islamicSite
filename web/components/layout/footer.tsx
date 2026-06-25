import Link from 'next/link'
import { Mark } from '@/components/ui/mark'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mark size={36} />
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>
                Al-Qarawiyyīn Academy
              </strong>
            </div>
            <div className="footer__brand-line">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <p className="footer__brand-trans">In the name of God, the Most Gracious, the Most Merciful.</p>
            <p style={{ color: 'rgba(245,237,216,0.62)', fontSize: 14, marginTop: 14, maxWidth: 320 }}>
              A small online madrasa, taught by Sheikh Abdulhakim. Qur'an, Arabic, Fiqh, ʿAqīdah — at the pace of a seminary.
            </p>
          </div>

          <div>
            <h4>Study</h4>
            <ul>
              <li><Link href="/courses">All courses</Link></li>
              <li><Link href="/courses?cat=quran">Qur'an</Link></li>
              <li><Link href="/courses?cat=arabic">Arabic</Link></li>
              <li><Link href="/courses?cat=fiqh">Fiqh & ʿAqīdah</Link></li>
              <li><Link href="/courses?free=1">Free lessons</Link></li>
            </ul>
          </div>

          <div>
            <h4>The Academy</h4>
            <ul>
              <li><Link href="/#about">About Sheikh Abdulhakim</Link></li>
              <li><Link href="/#method">Our method</Link></li>
              <li><Link href="/#ijazah">Ijazah & certification</Link></li>
              <li><Link href="/faq">Frequently asked</Link></li>
            </ul>
          </div>

          <div>
            <h4>Connect</h4>
            <ul>
              <li><Link href="/#newsletter">Newsletter</Link></li>
              <li><Link href="/#youtube">YouTube</Link></li>
              <li><Link href="/#telegram">Telegram</Link></li>
              <li><Link href="/contact">Contact us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Al-Qarawiyyīn Academy · Knowledge is light, and light cannot be hoarded.</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontStyle: 'normal', letterSpacing: '0.04em' }}>
            al-qarawiyyin.academy
          </span>
        </div>
      </div>
    </footer>
  )
}
