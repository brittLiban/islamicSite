import Link from 'next/link'
import { TopNav } from '@/components/layout/top-nav'
import { Footer } from '@/components/layout/footer'
import { CoursePoster } from '@/components/course/course-poster'
import { Divider } from '@/components/ui/divider'
import { Icon } from '@/components/ui/icon'
import { courses, instructor, values, testimonials } from '@/lib/data'

const featured = courses.slice(0, 4)

export default function LandingPage() {
  return (
    <>
      <TopNav />
      <HeroEditorial />

      {/* Bismillah belt */}
      <div style={{ padding: '32px 24px', textAlign: 'center', borderBottom: '1px solid var(--border-soft)' }}>
        <div className="arabic" style={{ fontSize: 28, color: 'var(--gold-3)', marginBottom: 4 }}>
          اطلبوا العلم من المهد إلى اللحد
        </div>
        <div className="meta">"Seek knowledge from the cradle to the grave." — attributed to the Prophet ﷺ</div>
      </div>

      {/* Values grid */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow--accent section-head__eyebrow">Why study here</div>
            <h2>A small academy, taught the <em>old way</em>.</h2>
            <p className="section-head__lede">
              One Sheikh. A curated curriculum. The cadence of a traditional seminary, brought to the device in your hand.
            </p>
          </div>
          <div className="values">
            {values.map((v) => {
              const IconComp = Icon[v.icon as keyof typeof Icon]
              return (
                <div className="value" key={v.icon}>
                  <div className="value__icon"><IconComp size={36} /></div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <div style={{ margin: 'var(--space-8) auto', maxWidth: 320 }}>
        <Divider />
      </div>

      {/* Featured courses */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow--gold section-head__eyebrow">The library</div>
            <h2>Eight courses, slowly <em>illuminated</em>.</h2>
            <p className="section-head__lede">
              Each is a complete course of study — recorded lecture by lecture, with notes, transcripts, and an oral examination at the end.
            </p>
          </div>
          <div className="course-grid">
            {featured.map((c) => (
              <Link key={c.id} href={`/courses/${c.slug}`} className="course-card">
                <div className="course-card__cover-wrap">
                  <div className="course-card__cover">
                    <CoursePoster course={c} />
                  </div>
                </div>
                <div className="course-card__meta">
                  <span className={`badge badge--${c.coverColor === 'gold' ? 'gold' : c.coverColor === 'clay' ? 'clay' : c.coverColor === 'slate' ? 'slate' : 'forest'}`}>
                    {c.catLabel}
                  </span>
                </div>
                <h3 className="course-card__title">{c.title}</h3>
                <span className="course-card__instructor">Sheikh Abdulhakim · {c.lessons} lessons</span>
                <div className="course-card__foot">
                  <span style={{ display: 'inline-flex', gap: 1, color: 'var(--gold-3)' }}>
                    {Array.from({ length: 5 }, (_, i) => <Icon.Star key={i} size={13} />)}
                    <span style={{ marginLeft: 6, fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic' }}>{c.rating.toFixed(1)}</span>
                  </span>
                  <span className="course-card__price">${c.price}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/courses" className="btn btn--secondary btn--lg">
              View the whole catalogue <Icon.Arrow size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Instructor profile */}
      <section className="section" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--border-soft)', borderBottom: '1px solid var(--border-soft)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 64, alignItems: 'center' }}>
            {/* Portrait plate */}
            <div style={{ position: 'relative', aspectRatio: '4/5', maxWidth: 420 }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--forest)', borderRadius: 4 }} />
              <div style={{ position: 'absolute', inset: 14, border: '1px solid var(--gold)', borderRadius: 2, pointerEvents: 'none', zIndex: 2 }} />
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><g stroke='%23DCB65E' stroke-width='0.4' fill='none' opacity='0.5'><polygon points='50,20 56,38 75,38 61,49 66,67 50,56 34,67 39,49 25,38 44,38' transform='scale(0.4) translate(75,75)'/></g></svg>\")",
                backgroundSize: 100,
                opacity: 0.10,
              }} />
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--paper)', textAlign: 'center', padding: 40 }}>
                <div style={{ width: 140, height: 140, borderRadius: '50%', background: 'var(--gold)', color: 'var(--forest-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-arabic)', fontSize: 80, marginBottom: 24, boxShadow: '0 12px 36px rgba(0,0,0,0.3)' }}>
                  {instructor.initials}
                </div>
                <div className="eyebrow" style={{ color: 'var(--gold-2)' }}>Founder · Instructor</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 500, color: 'var(--paper)', marginTop: 8 }}>
                  {instructor.name}
                </h3>
              </div>
            </div>

            {/* Bio */}
            <div>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 18 }}>A note from the teacher</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: 22 }}>
                "I began teaching in the courtyard of a small mosque in Hargeisa. <em>This is the same courtyard,</em> with better cameras."
              </h2>
              <p className="lede dropcap">{instructor.bio}</p>
              <div style={{ display: 'flex', gap: 36, marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <div>
                  <div className="hero__fact-num">{instructor.students.toLocaleString()}</div>
                  <div className="hero__fact-label">Students worldwide</div>
                </div>
                <div>
                  <div className="hero__fact-num">{instructor.courses}</div>
                  <div className="hero__fact-label">Courses published</div>
                </div>
                <div>
                  <div className="hero__fact-num">15<span style={{ fontSize: 22 }}>yr</span></div>
                  <div className="hero__fact-label">Teaching experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ margin: 'var(--space-8) auto', maxWidth: 320 }}>
        <Divider />
      </div>

      {/* Testimonials */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow--accent section-head__eyebrow">In their own words</div>
            <h2>Students, <em>from many places</em>.</h2>
          </div>
          <div className="testimonials">
            {testimonials.map((t, i) => (
              <div className="testimonial" key={i}>
                <span className="testimonial__quote-mark">"</span>
                <p className="testimonial__body">{t.body}</p>
                <div className="testimonial__person">
                  <div className="testimonial__avatar">{t.initial}</div>
                  <div>
                    <div className="testimonial__name">{t.name}</div>
                    <div className="testimonial__title">{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ background: 'var(--forest)', color: 'var(--paper)', textAlign: 'center', padding: '96px 24px' }}>
        <div className="arabic" style={{ fontSize: 38, color: 'var(--gold-2)', marginBottom: 18 }}>
          هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ
        </div>
        <p style={{ fontStyle: 'italic', color: 'rgba(245,237,216,0.7)', maxWidth: 580, margin: '0 auto 28px' }}>
          "Are those who know equal to those who do not know?" — Sūrat az-Zumar 39:9
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 500, color: 'var(--paper)', lineHeight: 1.1, maxWidth: 720, margin: '0 auto 28px' }}>
          Begin where you are.
        </h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/courses" className="btn btn--inverse btn--xl">Browse the catalogue</Link>
          <Link href="/signup" className="btn btn--ghost btn--xl" style={{ color: 'var(--gold-2)' }}>Create an account</Link>
        </div>
      </section>

      <Footer />
    </>
  )
}

function HeroEditorial() {
  const front = courses[0]
  const back1 = courses[4]
  const back2 = courses[2]

  return (
    <section className="hero hero--editorial">
      {/* Tile pattern overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><g stroke='%23DCB65E' stroke-width='0.4' fill='none'><polygon points='80,30 87,52 110,52 92,65 99,87 80,74 61,87 68,65 50,52 73,52'/><polygon points='80,30 87,52 110,52 92,65 99,87 80,74 61,87 68,65 50,52 73,52' transform='rotate(45,80,80)'/></g></svg>\")",
        backgroundSize: 160,
        opacity: 0.06,
        pointerEvents: 'none',
      }} />
      {/* Warm light from top-left */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 22% 30%, rgba(220,182,94,0.18), transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div className="hero__inner" style={{ position: 'relative', zIndex: 1 }}>
        {/* Left: copy */}
        <div>
          <div className="hero__bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="eyebrow" style={{ color: 'var(--gold-2)', marginBottom: 16 }}>
            Spring term · 1446 AH / 2026 CE
          </div>
          <h1 className="hero__title">
            Knowledge is <em>light</em>,<br />
            and light cannot be hoarded.
          </h1>
          <p className="hero__lede">
            Sheikh Abdulhakim's online madrasa — Qur'an, Arabic, Fiqh and ʿAqīdah, taught on video with the patience of a seminary and the production of a modern studio.
          </p>
          <div className="hero__cta">
            <Link href="/courses" className="btn btn--gold btn--xl">Browse the library</Link>
            <Link href={`/courses/${front.slug}`} className="btn btn--ghost btn--xl"
              style={{ color: 'var(--gold-2)', border: '1px solid rgba(220,182,94,0.5)' }}>
              <Icon.PlayCircle size={18} /> Watch a sample lecture
            </Link>
          </div>
          <div className="hero__facts">
            <div>
              <div className="hero__fact-num">{instructor.students.toLocaleString()}+</div>
              <div className="hero__fact-label">Students worldwide</div>
            </div>
            <div>
              <div className="hero__fact-num">{courses.length}</div>
              <div className="hero__fact-label">Courses in the library</div>
            </div>
            <div>
              <div className="hero__fact-num">{instructor.rating}/5</div>
              <div className="hero__fact-label">Average rating</div>
            </div>
          </div>
        </div>

        {/* Right: stacked posters */}
        <div style={{ position: 'relative', maxWidth: 540, margin: '0 auto', width: '100%' }}>
          <div className="eyebrow" style={{ color: 'var(--gold-2)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--gold-2)', boxShadow: '0 0 0 4px rgba(220,182,94,0.2)' }} />
            Most-watched this month
          </div>

          <div style={{ position: 'relative' }}>
            {/* Back posters */}
            <div style={{ position: 'absolute', inset: 0, transform: 'translate(28px, 40px) rotateZ(-2.4deg)', opacity: 0.55, filter: 'blur(0.4px)' }}>
              <CoursePoster course={back2} />
            </div>
            <div style={{ position: 'absolute', inset: 0, transform: 'translate(14px, 20px) rotateZ(1.6deg)', opacity: 0.78 }}>
              <CoursePoster course={back1} />
            </div>
            {/* Front poster */}
            <div style={{ position: 'relative', transition: 'transform 220ms cubic-bezier(0.2,0.8,0.2,1)' }}>
              <Link href={`/courses/${front.slug}`}>
                <CoursePoster course={front} />
              </Link>
            </div>
          </div>

          {/* Now-playing strip */}
          <div style={{
            marginTop: 16,
            background: 'rgba(245,237,216,0.08)',
            border: '1px solid rgba(220,182,94,0.28)',
            backdropFilter: 'blur(6px)',
            borderRadius: 4,
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <div style={{ color: 'var(--gold-2)', flexShrink: 0 }}>
              <Icon.PlayCircle size={22} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--paper)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {front.title}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(245,237,216,0.6)', fontStyle: 'italic' }}>
                {front.catLabel}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(220,182,94,0.7)', flexShrink: 0 }}>
              {front.duration}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
