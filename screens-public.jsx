// screens-public.jsx — Landing, Catalog, Course detail, Auth, Checkout
const { useState: useStateS1, useMemo: useMemoS1 } = React;
const useState = useStateS1, useMemo = useMemoS1;

// ============================================================
// LANDING
// ============================================================
const Landing = ({ navigate, tweaks }) => {
  const data = window.APP_DATA;
  const featured = data.courses.slice(0, 4);
  const heroVariant = tweaks.hero || "archway";

  return (
    <>
      <TopNav route="landing" navigate={navigate} isAuthed={tweaks.isAuthed}/>
      <LandingHero variant={heroVariant} navigate={navigate}/>

      {/* Bismillah-belt */}
      <div style={{ padding: "32px 24px", textAlign: "center", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="arabic" style={{ fontSize: 28, color: "var(--gold-3)", marginBottom: 4 }}>اطلبوا العلم من المهد إلى اللحد</div>
        <div className="meta">"Seek knowledge from the cradle to the grave." — attributed to the Prophet ﷺ</div>
      </div>

      {/* Values */}
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
            {data.values.map((v, i) => {
              const IconComp = Icon[v.icon === "book" ? "Book" : v.icon === "lamp" ? "Lamp" : v.icon === "globe" ? "Globe" : "Ribbon"];
              return (
                <div className="value" key={i}>
                  <div className="value__icon"><IconComp size={36}/></div>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <hr className="ornament"/>

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
            {featured.map(c => <CourseCard key={c.id} course={c} navigate={navigate} showEnrolled/>)}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <button className="btn btn--secondary btn--lg" onClick={() => navigate("catalog")}>
              View the whole catalogue <Icon.Arrow size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="section" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--border-soft)", borderBottom: "1px solid var(--border-soft)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 64, alignItems: "center" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", maxWidth: 420 }}>
              <div style={{ position: "absolute", inset: 0, background: "var(--forest)", borderRadius: 4 }}/>
              <div style={{ position: "absolute", inset: 14, border: "1px solid var(--gold)", borderRadius: 2, pointerEvents: "none", zIndex: 2 }}/>
              <div style={{ position: "absolute", inset: 0, background: "url(ornaments/tile.svg)", backgroundSize: 100, opacity: 0.10 }}/>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "var(--paper)", textAlign: "center", padding: 40 }}>
                <div style={{ width: 140, height: 140, borderRadius: "50%", background: "var(--gold)", color: "var(--forest-2)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-arabic)", fontSize: 80, marginBottom: 24, boxShadow: "0 12px 36px rgba(0,0,0,0.3)" }}>
                  {data.instructor.initials}
                </div>
                <div className="eyebrow" style={{ color: "var(--gold-2)" }}>Founder · Instructor</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--paper)", marginTop: 8 }}>{data.instructor.name}</h3>
              </div>
            </div>
            <div>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 18 }}>A note from the teacher</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: 22 }}>
                "I began teaching in the courtyard of a small mosque in Hargeisa. <em>This is the same courtyard,</em> with better cameras."
              </h2>
              <p className="lede dropcap">
                Sheikh Abdulhakim is a graduate of the Islamic University of Madinah and holds an ijazah in the recitation of Ḥafṣ ʿan ʿĀṣim. He has spent the last fifteen years teaching the Qur'an, Fiqh, and the Arabic sciences in East Africa and the diaspora — and now, at last, on this platform.
              </p>
              <div style={{ display: "flex", gap: 36, marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
                <div>
                  <div className="hero__fact-num">{data.instructor.students.toLocaleString()}</div>
                  <div className="hero__fact-label">Students worldwide</div>
                </div>
                <div>
                  <div className="hero__fact-num">{data.instructor.courses}</div>
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

      <hr className="ornament"/>

      {/* Testimonials */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="eyebrow eyebrow--accent section-head__eyebrow">In their own words</div>
            <h2>Students, <em>from many places</em>.</h2>
          </div>
          <div className="testimonials">
            {data.testimonials.map((t, i) => (
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
      <section className="section" style={{ background: "var(--forest)", color: "var(--paper)", textAlign: "center", padding: "96px 24px" }}>
        <div className="arabic" style={{ fontSize: 38, color: "var(--gold-2)", marginBottom: 18 }}>
          هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ
        </div>
        <p style={{ fontStyle: "italic", color: "rgba(245,237,216,0.7)", maxWidth: 580, margin: "0 auto 28px" }}>
          "Are those who know equal to those who do not know?" — Sūrat az-Zumar 39:9
        </p>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 56, fontWeight: 500, color: "var(--paper)", lineHeight: 1.1, maxWidth: 720, margin: "0 auto 28px" }}>
          Begin where you are.
        </h2>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button className="btn btn--inverse btn--xl" onClick={() => navigate("catalog")}>Browse the catalogue</button>
          <button className="btn btn--ghost btn--xl" style={{ color: "var(--gold-2)" }} onClick={() => navigate("signup")}>Create an account</button>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
};

// ============================================================
// HERO VARIANTS
// ============================================================
const LandingHero = ({ variant, navigate }) => {
  if (variant === "editorial") return <HeroEditorial navigate={navigate}/>;
  if (variant === "bookshelf") return <HeroBookshelf navigate={navigate}/>;
  return <HeroArchway navigate={navigate}/>;
};

const HeroArchway = ({ navigate }) => {
  const data = window.APP_DATA;
  return (
    <section className="hero hero--archway">
      <div className="hero__inner">
        <div>
          <div className="hero__bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="eyebrow eyebrow--gold hero__eyebrow">Founded 2018 · Hargeisa & online</div>
          <h1 className="hero__title">
            A quiet madrasa,<br/>
            for the <em>seeking</em>.
          </h1>
          <p className="hero__lede">
            Qur'an, classical Arabic, Fiqh and ʿAqīdah — taught by a single Sheikh with the patience of the traditional seminary, on the device in your hand.
          </p>
          <div className="hero__cta">
            <button className="btn btn--primary btn--xl" onClick={() => navigate("catalog")}>Browse courses</button>
            <button className="btn btn--secondary btn--xl" onClick={() => navigate("course/tajweed-foundations")}>
              <Icon.PlayCircle size={18}/> Watch a sample lesson
            </button>
          </div>
          <div className="hero__facts">
            <div>
              <div className="hero__fact-num">{data.instructor.students.toLocaleString()}+</div>
              <div className="hero__fact-label">Students enrolled</div>
            </div>
            <div>
              <div className="hero__fact-num">{data.courses.length}</div>
              <div className="hero__fact-label">Courses in the library</div>
            </div>
            <div>
              <div className="hero__fact-num">{data.instructor.rating}<span style={{ fontSize: 22 }}>/5</span></div>
              <div className="hero__fact-label">Average rating</div>
            </div>
          </div>
        </div>

        {/* Right: archway plate */}
        <div className="hero__plate">
          {/* Mihrab arch shape */}
          <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div style={{ textAlign: "center", color: "var(--gold-2)" }}>
              <div className="arabic" style={{ fontSize: 26, marginBottom: 12 }}>اقرأ</div>
              <div className="eyebrow" style={{ color: "rgba(220, 182, 94, 0.85)", letterSpacing: "0.24em" }}>Iqra · Read</div>
            </div>

            {/* Big mihrab silhouette */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <svg viewBox="0 0 200 280" width="100%" style={{ maxHeight: 360 }}>
                <defs>
                  <linearGradient id="archfill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#DCB65E" stopOpacity="0.18"/>
                    <stop offset="1" stopColor="#DCB65E" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M 20 280 L 20 100 Q 20 20 100 8 Q 180 20 180 100 L 180 280 Z"
                      fill="url(#archfill)" stroke="#DCB65E" strokeWidth="1.4"/>
                <path d="M 32 280 L 32 100 Q 32 30 100 20 Q 168 30 168 100 L 168 280"
                      fill="none" stroke="#DCB65E" strokeWidth="0.6" opacity="0.7"/>
                <path d="M 50 280 L 50 110 Q 50 50 100 42 Q 150 50 150 110 L 150 280"
                      fill="none" stroke="#DCB65E" strokeWidth="0.4" opacity="0.5"/>
                {/* Star centerpiece */}
                <g transform="translate(100,140)" stroke="#DCB65E" strokeWidth="1" fill="none">
                  <polygon points="0,-28 8,-8 28,0 8,8 0,28 -8,8 -28,0 -8,-8"/>
                  <polygon points="0,-28 8,-8 28,0 8,8 0,28 -8,8 -28,0 -8,-8" transform="rotate(45)"/>
                  <circle r="4" fill="#DCB65E"/>
                  <circle r="36"/>
                  <circle r="48" opacity="0.4"/>
                </g>
                <text x="100" y="220" textAnchor="middle" fill="#DCB65E"
                      style={{ fontFamily: "Amiri, serif", fontSize: 22 }}>
                  العلم نور
                </text>
                <text x="100" y="244" textAnchor="middle" fill="#DCB65E" opacity="0.7"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 13, letterSpacing: "0.18em" }}>
                  Knowledge is light
                </text>
              </svg>
            </div>

            {/* Bottom plate caption */}
            <div style={{ textAlign: "center", paddingTop: 14, borderTop: "1px solid rgba(220,182,94,0.3)", color: "rgba(220, 182, 94, 0.7)" }}>
              <div style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: 14, letterSpacing: "0.16em" }}>
                · The Mihrab of Knowledge ·
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroBookshelf = ({ navigate }) => {
  const data = window.APP_DATA;
  return (
    <section className="hero hero--bookshelf">
      <div className="hero__inner">
        <div className="hero__bismillah" style={{ textAlign: "center" }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div className="eyebrow eyebrow--gold hero__eyebrow" style={{ display: "block", textAlign: "center", marginBottom: 14 }}>An online madrasa · since 2018</div>
        <h1 className="hero__title" style={{ maxWidth: 1000, margin: "0 auto 24px" }}>
          A library of <em>recorded</em> lectures.
        </h1>
        <p className="hero__lede" style={{ maxWidth: 640 }}>
          Eight courses, taught on video by Sheikh Abdulhakim — Qur'an, Arabic, Fiqh, and ʿAqīdah, at the rhythm of a traditional seminary.
        </p>
        <div className="hero__cta">
          <button className="btn btn--primary btn--xl" onClick={() => navigate("catalog")}>Open the library</button>
          <button className="btn btn--secondary btn--xl" onClick={() => navigate("course/tajweed-foundations")}>
            <Icon.PlayCircle size={18}/> Watch a sample
          </button>
        </div>

        {/* Wall of lecture posters */}
        <div className="hero__wall">
          {data.courses.map(c => (
            <button key={c.id} className="hero__wall-card" onClick={() => navigate(`course/${c.slug}`)}>
              <BookCover course={c}/>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const HeroEditorial = ({ navigate }) => {
  const data = window.APP_DATA;
  const featured = data.courses[0];
  const back1 = data.courses[4];
  const back2 = data.courses[2];
  return (
    <section className="hero hero--editorial">
      {/* arabesque tile pattern, faint, full bleed */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(ornaments/tile.svg)", backgroundSize: 160, opacity: 0.06, pointerEvents: "none" }}/>
      {/* warm spot of light from top-left */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 22% 30%, rgba(220, 182, 94, 0.18), transparent 55%)", pointerEvents: "none" }}/>

      <div className="hero__inner" style={{ position: "relative", zIndex: 1 }}>
        <div>
          <div className="hero__bismillah">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <div className="eyebrow" style={{ color: "var(--gold-2)", marginBottom: 16 }}>Spring term · 1446 AH / 2026 CE</div>
          <h1 className="hero__title">
            Knowledge is <em>light</em>,<br/>
            and light cannot be hoarded.
          </h1>
          <p className="hero__lede">
            Sheikh Abdulhakim's online madrasa — Qur'an, Arabic, Fiqh and ʿAqīdah, taught on video with the patience of a seminary and the production of a modern studio.
          </p>
          <div className="hero__cta">
            <button className="btn btn--gold btn--xl" onClick={() => navigate("catalog")}>Browse the library</button>
            <button className="btn btn--ghost btn--xl" style={{ color: "var(--gold-2)", border: "1px solid rgba(220,182,94,0.5)" }} onClick={() => navigate(`course/${featured.slug}`)}>
              <Icon.PlayCircle size={18}/> Watch a sample lecture
            </button>
          </div>
          <div className="hero__facts">
            <div><div className="hero__fact-num">{data.instructor.students.toLocaleString()}+</div><div className="hero__fact-label">Students worldwide</div></div>
            <div><div className="hero__fact-num">{data.courses.length}</div><div className="hero__fact-label">Courses in the library</div></div>
            <div><div className="hero__fact-num">{data.instructor.rating}/5</div><div className="hero__fact-label">Average rating</div></div>
          </div>
        </div>

        {/* Right: featured lecture, presented as a stack with annotations */}
        <div style={{ position: "relative", maxWidth: 540, margin: "0 auto", width: "100%" }}>
          <div className="eyebrow" style={{ color: "var(--gold-2)", marginBottom: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--gold-2)", boxShadow: "0 0 0 4px rgba(220,182,94,0.2)" }}/>
            Most-watched this month
          </div>

          <div style={{ position: "relative" }}>
            {/* Back posters */}
            <div style={{ position: "absolute", inset: 0, transform: "translate(28px, 40px) rotateZ(-2.4deg)", opacity: 0.55, filter: "blur(0.4px)" }}>
              <BookCover course={back2}/>
            </div>
            <div style={{ position: "absolute", inset: 0, transform: "translate(14px, 20px) rotateZ(1.6deg)", opacity: 0.78 }}>
              <BookCover course={back1}/>
            </div>
            {/* Front poster — clickable */}
            <button onClick={() => navigate(`course/${featured.slug}`)}
                    style={{ position: "relative", background: 0, border: 0, padding: 0, cursor: "pointer", display: "block", width: "100%", transition: "transform 280ms" }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-6px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <BookCover course={featured}/>
            </button>
          </div>

          {/* Now-playing strip beneath */}
          <div style={{ marginTop: 24, padding: "16px 18px", background: "rgba(245, 237, 216, 0.08)", border: "1px solid rgba(220, 182, 94, 0.28)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: 14, backdropFilter: "blur(6px)" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gold-2)", color: "var(--forest-2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon.Play size={14} fill="var(--forest-2)"/>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontStyle: "italic", color: "var(--paper)", lineHeight: 1.2 }}>
                Lesson 04 — Practice plate: al-Fātiḥah, slowly
              </div>
              <div style={{ fontSize: 12, color: "rgba(245,237,216,0.6)", fontStyle: "italic", marginTop: 2 }}>
                A free preview from {featured.title}
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--gold-2)", whiteSpace: "nowrap" }}>18:42</div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// CATALOG
// ============================================================
const Catalog = ({ navigate, tweaks }) => {
  const data = window.APP_DATA;
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const courses = useMemo(() => {
    let list = data.courses;
    if (cat !== "all") list = list.filter(c => c.cat === cat);
    if (q) list = list.filter(c => (c.title + c.blurb + c.arabic).toLowerCase().includes(q.toLowerCase()));
    return list;
  }, [cat, q]);

  return (
    <>
      <TopNav route="catalog" navigate={navigate} isAuthed={tweaks.isAuthed}/>
      <section style={{ padding: "64px 0 32px", background: "var(--paper-2)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="eyebrow eyebrow--accent" style={{ marginBottom: 14 }}>The Library</div>
          <h1 className="h1" style={{ fontSize: 64, marginBottom: 12 }}>
            All <em>courses</em>.
          </h1>
          <p className="lede" style={{ maxWidth: 640, marginBottom: 0 }}>
            Every course is a complete program of study — video lectures, course notes, an oral examination, and a written ijazah on completion.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section style={{ padding: "32px 0", background: "var(--paper)", borderBottom: "1px solid var(--border-soft)", position: "sticky", top: 71, zIndex: 30, backdropFilter: "blur(8px)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {data.categories.map(c => (
                <button key={c.id} className={`chip ${cat === c.id ? "is-active" : ""}`} onClick={() => setCat(c.id)}>
                  {c.label} <span style={{ opacity: 0.6, marginLeft: 4, fontVariant: "normal" }}>· {c.count}</span>
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper-2)", border: "1px solid var(--border-strong)", padding: "8px 14px", borderRadius: "var(--radius-xs)", minWidth: 280 }}>
              <Icon.Search size={16}/>
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the library…"
                     style={{ flex: 1, border: 0, outline: 0, background: "transparent", fontFamily: "var(--font-body)", fontSize: 14, color: "var(--ink)", fontStyle: "italic" }}/>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "64px 0 96px" }}>
        <div className="container">
          {courses.length === 0 ? (
            <div style={{ padding: 80, textAlign: "center", color: "var(--fg-3)", fontStyle: "italic" }}>No courses match that search.</div>
          ) : (
            <div className="course-grid">
              {courses.map(c => <CourseCard key={c.id} course={c} navigate={navigate} showEnrolled/>)}
            </div>
          )}
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
};

// ============================================================
// COURSE DETAIL
// ============================================================
const CourseDetail = ({ navigate, slug, tweaks, onEnroll }) => {
  const course = window.APP_DATA.courses.find(c => c.slug === slug) || window.APP_DATA.courses[0];
  const [openModule, setOpenModule] = useState(0);
  const modules = course.modules || [
    { title: "Module I — Introduction", lessons: [
      { t: "Welcome & curriculum overview", d: "10:00", free: true },
      { t: "How this course is taught", d: "8:24", free: true },
    ]},
    { title: "Module II — First Principles", lessons: [
      { t: "The opening lecture", d: "32:14" },
      { t: "Field exercise", d: "—" },
    ]},
  ];

  return (
    <>
      <TopNav route="catalog" navigate={navigate} isAuthed={tweaks.isAuthed}/>

      <section className="detail">
        <div className="detail__inner">
          <div>
            <button className="detail__back" onClick={() => navigate("catalog")}>
              <Icon.ArrowLeft size={14}/> Back to the library
            </button>
            <div className="eyebrow detail__category">{course.catLabel} · {course.level}</div>
            <h1 className="detail__title">{course.title}</h1>
            <div className="detail__arabic">{course.arabic}</div>
            <p className="detail__lede">{course.lede || course.blurb}</p>

            <div className="detail__instructor">
              <div className="detail__instructor-avatar">ع</div>
              <div>
                <div className="detail__inst-name">Sheikh Abdulhakim</div>
                <div className="detail__inst-line">Founder · Imam · Mufassir</div>
              </div>
              <div style={{ flex: 1 }}/>
              <Stars value={course.rating} size={16}/>
            </div>

            <div className="detail__meta">
              <div className="detail__meta-item">
                <div className="detail__meta-label">Lessons</div>
                <div className="detail__meta-val">{course.lessons}</div>
              </div>
              <div className="detail__meta-item">
                <div className="detail__meta-label">Duration</div>
                <div className="detail__meta-val">{course.duration}</div>
              </div>
              <div className="detail__meta-item">
                <div className="detail__meta-label">Enrolled</div>
                <div className="detail__meta-val">{course.students.toLocaleString()}</div>
              </div>
              <div className="detail__meta-item">
                <div className="detail__meta-label">Language</div>
                <div className="detail__meta-val" style={{ fontSize: 18 }}>EN · AR · SO</div>
              </div>
            </div>
          </div>

          {/* Sticky enroll card */}
          <aside className="enroll-card">
            <div className="enroll-card__cover-wrap">
              <BookCover course={course}/>
            </div>
            <div className="enroll-card__price">${course.price}</div>
            <div className="meta">One-time payment · Lifetime access</div>
            {course.enrolled ? (
              <button className="btn btn--primary btn--lg" style={{ width: "100%", marginTop: 18 }} onClick={() => navigate(`lesson/${course.slug}/0`)}>
                <Icon.PlayCircle size={18}/> Continue learning
              </button>
            ) : (
              <button className="btn btn--primary btn--lg" style={{ width: "100%", marginTop: 18 }} onClick={() => { onEnroll(course); navigate("checkout"); }}>
                Enroll now
              </button>
            )}
            <ul className="enroll-card__list">
              <li><Icon.Check size={16}/> {course.lessons} video lessons</li>
              <li><Icon.FileText size={16}/> Downloadable course notes (PDF)</li>
              <li><Icon.Globe size={16}/> Arabic source-text on every screen</li>
              <li><Icon.Ribbon size={16}/> Ijazah upon completion</li>
              <li><Icon.Clock size={16}/> Lifetime access &middot; learn at your pace</li>
            </ul>
          </aside>
        </div>
      </section>

      {/* Curriculum */}
      <section className="curriculum">
        <div className="curriculum__inner">
          <div>
            <div className="eyebrow eyebrow--accent" style={{ marginBottom: 12 }}>The Curriculum</div>
            <h2 className="h1" style={{ fontSize: 48, marginBottom: 32 }}>What we will <em>study</em>.</h2>

            {modules.map((m, i) => (
              <div className="module" key={i}>
                <button className="module__head" onClick={() => setOpenModule(openModule === i ? -1 : i)}>
                  <span className="module__num">{["I","II","III","IV","V","VI"][i]}</span>
                  <span className="module__title">{m.title}</span>
                  <span className="module__count">{m.lessons.length} lessons</span>
                  <Icon.ChevronDown size={16} style={{ transform: openModule === i ? "rotate(180deg)" : undefined, transition: "transform 200ms" }}/>
                </button>
                {openModule === i && (
                  <ul className="module__lessons">
                    {m.lessons.map((l, j) => (
                      <li className="lesson-row" key={j}
                          onClick={() => course.enrolled || l.free ? navigate(`lesson/${course.slug}/0`) : null}>
                        {l.done ? <Icon.CheckCircle size={18} className="lesson-row__icon lesson-row__icon--done"/> :
                          l.free || course.enrolled ? <Icon.PlayCircle size={18} className="lesson-row__icon lesson-row__icon--play"/> :
                          <Icon.Lock size={16} className="lesson-row__icon lesson-row__icon--locked"/>}
                        <span className="lesson-row__title">{l.t}</span>
                        {l.free && <span className="lesson-row__free">Free preview</span>}
                        <span className="lesson-row__duration">{l.d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Right column — what you'll receive */}
          <aside style={{ alignSelf: "flex-start" }}>
            <div className="card card--frame" style={{ padding: 28 }}>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 12 }}>What you'll receive</div>
              <h3 className="h3" style={{ fontSize: 24, fontFamily: "var(--font-display)" }}>The complete course</h3>
              <p style={{ fontSize: 14, color: "var(--fg-2)", lineHeight: 1.6 }}>
                {course.blurb}
              </p>
              <hr className="rule"/>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13 }}>
                <span className="meta">Audio quality</span><span>Studio</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, borderTop: "1px solid var(--border-soft)" }}>
                <span className="meta">Video quality</span><span>1080p · captions</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, borderTop: "1px solid var(--border-soft)" }}>
                <span className="meta">Updated</span><span>March 2026</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 13, borderTop: "1px solid var(--border-soft)" }}>
                <span className="meta">Access</span><span>Lifetime</span>
              </div>
            </div>

            <div className="card" style={{ marginTop: 20, padding: 24, background: "var(--gold-soft)", borderColor: "var(--gold)" }}>
              <div className="eyebrow" style={{ color: "var(--gold-3)", marginBottom: 10 }}>A note on payment</div>
              <p style={{ fontSize: 13, color: "var(--ink-2)", margin: 0 }}>
                If the price is a barrier, write to us — we keep a small scholarship fund and never turn away a sincere seeker.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer navigate={navigate}/>
    </>
  );
};

Object.assign(window, { Landing, Catalog, CourseDetail, LandingHero });
