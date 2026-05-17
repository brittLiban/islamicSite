// screens-dashboard.jsx — Student dashboard, Lesson player
const { useState: useStateS3, useMemo: useMemoS3 } = React;
const useState = useStateS3, useMemo = useMemoS3;

// ============================================================
// DASHBOARD SIDEBAR (shared by student and admin)
// ============================================================
const DashSidebar = ({ items, active, onSelect, navigate, label = "Library" }) => (
  <aside className="dash__side">
    <button className="dash__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer", textAlign: "left" }}>
      <Mark size={32}/>
      <span className="dash__brand-name">Al-Qarawiyyīn</span>
    </button>
    <div className="dash__nav-section">{label}</div>
    {items.map(it => (
      <button key={it.key}
              className={`dash__nav-item ${active === it.key ? "is-active" : ""}`}
              onClick={() => onSelect(it.key)}>
        {it.icon}
        <span>{it.label}</span>
        {it.count !== undefined && <span style={{ marginLeft: "auto", fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)" }}>{it.count}</span>}
      </button>
    ))}
    <div style={{ flex: 1 }}/>
    <div style={{ padding: 12, borderTop: "1px solid var(--border-soft)", marginTop: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--forest)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 600 }}>
          L
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Layla Abdullahi</div>
          <div style={{ fontSize: 11, color: "var(--fg-3)", fontStyle: "italic", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>student@example.com</div>
        </div>
      </div>
    </div>
  </aside>
);

// ============================================================
// STUDENT DASHBOARD
// ============================================================
const Dashboard = ({ navigate, tweaks }) => {
  const data = window.APP_DATA;
  const [tab, setTab] = useState("courses");

  const enrolled = data.courses.filter(c => c.enrolled);
  const nav = [
    { key: "courses", label: "My courses", icon: <Icon.Library size={18}/>, count: enrolled.length },
    { key: "continue", label: "Continue", icon: <Icon.PlayCircle size={18}/> },
    { key: "ijazah", label: "Certificates", icon: <Icon.Ribbon size={18}/>, count: 1 },
    { key: "receipts", label: "Receipts", icon: <Icon.Receipt size={18}/>, count: 3 },
    { key: "account", label: "Account", icon: <Icon.Settings size={18}/> },
  ];

  return (
    <div className="dash">
      <DashSidebar items={nav} active={tab} onSelect={setTab} navigate={navigate}/>

      <main className="dash__main">
        <header className="dash__topbar">
          <div className="eyebrow" style={{ color: "var(--fg-3)" }}>
            <span style={{ color: "var(--accent)" }}>{tab === "receipts" ? "Receipts" : tab === "account" ? "Account" : tab === "ijazah" ? "Certificates" : "My library"}</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button className="btn btn--ghost btn--sm" onClick={() => navigate("catalog")}>Browse the library</button>
            <div style={{ width: 1, height: 20, background: "var(--border)" }}/>
            <span className="meta">As-salāmu ʿalaykum, <strong style={{ fontStyle: "normal", color: "var(--ink)" }}>Layla</strong></span>
          </div>
        </header>

        <div className="dash__page">
          {tab === "courses" && <DashboardMyCourses enrolled={enrolled} navigate={navigate}/>}
          {tab === "continue" && <DashboardContinue enrolled={enrolled} navigate={navigate}/>}
          {tab === "ijazah" && <DashboardIjazah enrolled={enrolled}/>}
          {tab === "receipts" && <DashboardReceipts enrolled={enrolled}/>}
          {tab === "account" && <DashboardAccount/>}
        </div>
      </main>
    </div>
  );
};

const DashboardMyCourses = ({ enrolled, navigate }) => {
  const active = enrolled.find(c => c.progress > 0 && c.progress < 1) || enrolled[0];
  return (
    <>
      <div className="dash__page-head">
        <div>
          <div className="eyebrow eyebrow--accent">As-salāmu ʿalaykum, Layla</div>
          <h1>Your <em>library</em>.</h1>
          <p>Three courses open. Continue where you stopped, or begin a new one.</p>
        </div>
        <button className="btn btn--secondary btn--md" onClick={() => navigate("catalog")}>
          <Icon.Plus size={14}/> Add a course
        </button>
      </div>

      {/* Continue where you stopped — featured */}
      {active && (
        <div style={{ background: "var(--forest)", color: "var(--paper)", borderRadius: "var(--radius-md)", padding: 32, marginBottom: 48, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(ornaments/tile.svg)", backgroundSize: 120, opacity: 0.06 }}/>
          <div style={{ position: "relative", display: "grid", gridTemplateColumns: "140px 1fr auto", gap: 28, alignItems: "center" }}>
            <div><BookCover course={active}/></div>
            <div>
              <div className="eyebrow" style={{ color: "var(--gold-2)", marginBottom: 8 }}>Continue where you stopped</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 36, fontWeight: 500, color: "var(--paper)", lineHeight: 1.1, marginBottom: 6 }}>{active.title}</h2>
              <div className="arabic" style={{ fontSize: 20, color: "var(--gold-2)", marginBottom: 4 }}>{active.arabic}</div>
              <div className="somali" style={{ color: "rgba(245,237,216,0.6)", fontSize: 13, marginBottom: 14 }}>{active.somali}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 14, color: "rgba(245,237,216,0.7)", fontSize: 14 }}>
                <span>Module II · Lesson 2</span>
                <span style={{ color: "rgba(245,237,216,0.4)" }}>·</span>
                <span>{Math.round(active.progress * 100)}% complete</span>
              </div>
              <div style={{ height: 4, background: "rgba(245,237,216,0.16)", borderRadius: 2, overflow: "hidden", marginTop: 14, maxWidth: 360 }}>
                <div style={{ height: "100%", width: `${active.progress * 100}%`, background: "var(--gold-2)" }}/>
              </div>
            </div>
            <button className="btn btn--gold btn--lg" onClick={() => navigate(`lesson/${active.slug}/0`)}>
              <Icon.PlayCircle size={18}/> Resume
            </button>
          </div>
        </div>
      )}

      <div className="eyebrow eyebrow--accent" style={{ marginBottom: 18 }}>All enrolled courses</div>
      <div className="mc-grid">
        {enrolled.map(c => (
          <button key={c.id} className="mc-card" onClick={() => navigate(`lesson/${c.slug}/0`)}>
            <div className="mc-card__cover"><BookCover course={c}/></div>
            <div className="badge badge--forest" style={{ alignSelf: "flex-start", marginBottom: 8 }}>{c.catLabel}</div>
            <div className="mc-card__title">{c.title}</div>
            <div className="mc-card__instructor">Sheikh Abdulhakim · {c.lessons} lessons</div>
            <div className="mc-card__progress">
              <div className="mc-card__progress-label">
                <span>Progress</span>
                <span>{Math.round(c.progress * 100)}%</span>
              </div>
              <div className="mc-card__progress-bar">
                <div className="mc-card__progress-fill" style={{ width: `${c.progress * 100}%` }}/>
              </div>
            </div>
            <div className="mc-card__continue">
              <span>Continue reading</span>
              <Icon.Arrow size={14}/>
            </div>
          </button>
        ))}
      </div>
    </>
  );
};

const DashboardContinue = ({ enrolled, navigate }) => (
  <>
    <div className="dash__page-head">
      <div>
        <h1>Recent <em>study</em>.</h1>
        <p>Your last several sessions, ordered by when you stopped.</p>
      </div>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {enrolled.concat(enrolled).slice(0, 6).map((c, i) => (
        <button key={i} className="card" onClick={() => navigate(`lesson/${c.slug}/0`)}
                style={{ display: "grid", gridTemplateColumns: "80px 1fr auto auto", gap: 20, alignItems: "center", background: "var(--paper-2)", cursor: "pointer", border: "1px solid var(--border)", textAlign: "left" }}>
          <BookCover course={c}/>
          <div>
            <div className="eyebrow" style={{ color: "var(--fg-3)" }}>{c.catLabel}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, marginTop: 4 }}>{c.title}</div>
            <div className="meta" style={{ marginTop: 4 }}>Module II — Lesson {((i % 4) + 1)} · 18 minutes left</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="meta">Last opened</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--ink)" }}>2 hours ago</div>
          </div>
          <Icon.PlayCircle size={28}/>
        </button>
      ))}
    </div>
  </>
);

const DashboardIjazah = ({ enrolled }) => {
  const completed = enrolled.find(c => c.progress > 0.7);
  return (
    <>
      <div className="dash__page-head">
        <div>
          <h1>Your <em>certificates</em>.</h1>
          <p>Issued by Sheikh Abdulhakim upon completion of the course and oral examination.</p>
        </div>
      </div>
      {completed && (
        <div style={{ position: "relative", aspectRatio: "1.45/1", maxWidth: 760, margin: "0 auto", background: "var(--paper)", border: "1px solid var(--border-strong)", padding: 48, boxShadow: "var(--shadow-lg)" }}>
          <div style={{ position: "absolute", inset: 18, border: "2px solid var(--gold)", pointerEvents: "none" }}/>
          <div style={{ position: "absolute", inset: 28, border: "0.5px solid var(--gold-3)", pointerEvents: "none" }}/>
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <div className="arabic" style={{ fontSize: 32, color: "var(--gold-3)", marginBottom: 8 }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            <div className="eyebrow" style={{ letterSpacing: "0.32em", color: "var(--gold-3)", marginBottom: 8 }}>Al-Qarawiyyīn Academy</div>
            <Divider width={220}/>
            <div className="eyebrow eyebrow--accent" style={{ marginTop: 24 }}>This is to certify that</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 500, fontStyle: "italic", margin: "10px 0 18px", color: "var(--ink)" }}>Layla Abdullahi</h2>
            <p style={{ maxWidth: 520, margin: "0 auto", color: "var(--ink-2)", fontSize: 15, lineHeight: 1.6 }}>
              has completed the course <em>{completed.title}</em> and passed the oral examination on the {completed.lessons} lessons therein. May Allah accept this from her and increase her in beneficial knowledge.
            </p>
            <div style={{ display: "flex", justifyContent: "space-around", marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, color: "var(--ink)" }}>Sheikh Abdulhakim</div>
                <div className="eyebrow">Founder · Instructor</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>15 · IV · 1447 AH</div>
                <div className="eyebrow">Date issued</div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 14 }}>IJZ-00128</div>
                <div className="eyebrow">Reference</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div style={{ textAlign: "center", marginTop: 24 }}>
        <button className="btn btn--secondary btn--md"><Icon.Download size={14}/> Download as PDF</button>
      </div>
    </>
  );
};

const DashboardReceipts = ({ enrolled }) => (
  <>
    <div className="dash__page-head">
      <div>
        <h1>Receipts &amp; <em>purchases</em>.</h1>
        <p>A record of every course you've enrolled in.</p>
      </div>
    </div>
    <div className="tabletop">
      <table className="tbl">
        <thead><tr><th>Date</th><th>Reference</th><th>Course</th><th>Method</th><th style={{ textAlign: "right" }}>Amount</th><th></th></tr></thead>
        <tbody>
          {enrolled.map((c, i) => (
            <tr key={c.id}>
              <td>{["12 May 2026", "08 March 2026", "14 January 2026"][i] || "01 Jan 2026"}</td>
              <td className="tbl__id">ch_3OqW2k...{i}K1Ld8</td>
              <td><strong style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500 }}>{c.title}</strong></td>
              <td className="meta">Visa · 4242</td>
              <td className="tbl__money" style={{ textAlign: "right" }}>${c.price.toFixed(2)}</td>
              <td style={{ textAlign: "right" }}><button className="btn btn--ghost btn--sm"><Icon.Download size={12}/> PDF</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const DashboardAccount = () => (
  <>
    <div className="dash__page-head">
      <div>
        <h1>Account <em>settings</em>.</h1>
        <p>Your name, email, password, and preferences.</p>
      </div>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 880 }}>
      <div>
        <div className="eyebrow eyebrow--accent" style={{ marginBottom: 18 }}>Profile</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--forest)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 28 }}>L</div>
            <button className="btn btn--secondary btn--md">Change photo</button>
          </div>
          <Field label="Full name" defaultValue="Layla Abdullahi"/>
          <Field label="Display name (Arabic)" defaultValue="ليلى عبد الله"/>
          <Field label="Email" type="email" defaultValue="layla@example.com"/>
          <Field label="Time zone" defaultValue="America/Chicago (UTC−6)"/>
        </div>
      </div>
      <div>
        <div className="eyebrow eyebrow--accent" style={{ marginBottom: 18 }}>Security &amp; preferences</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Current password" type="password" defaultValue="••••••••"/>
          <Field label="New password" type="password" placeholder="At least 8 characters"/>
          <Field label="Confirm new password" type="password"/>
          <div className="field-row">
            <span className="label">Preferred language</span>
            <select className="field" defaultValue="en">
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="so">Soomaali</option>
            </select>
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6, fontSize: 14, color: "var(--fg-2)" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }}/>
            Receive a weekly note from Sheikh Abdulhakim
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--fg-2)" }}>
            <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }}/>
            Email me when I complete a module
          </label>
        </div>
      </div>
    </div>
    <div style={{ display: "flex", gap: 12, marginTop: 36, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
      <button className="btn btn--primary btn--lg">Save changes</button>
      <button className="btn btn--ghost btn--lg">Cancel</button>
    </div>
  </>
);

// ============================================================
// LESSON PLAYER
// ============================================================
const LessonPlayer = ({ navigate, slug, lessonIdx, tweaks }) => {
  const course = window.APP_DATA.courses.find(c => c.slug === slug) || window.APP_DATA.courses[0];
  const allLessons = useMemo(() => {
    const flat = [];
    (course.modules || []).forEach((m, mi) => {
      m.lessons.forEach((l, li) => flat.push({ ...l, module: m.title, mi, li, idx: flat.length }));
    });
    return flat;
  }, [course]);
  const [active, setActive] = useState(parseInt(lessonIdx, 10) || 5);
  const [tab, setTab] = useState("notes");
  const [notes, setNotes] = useState("Module II — Lesson 2 — Ṣifāt without opposite.\n\nThe seven without opposite are: ṣafīr, qalqalah, līn, inḥirāf, takrīr, tafashshī, istiṭālah. The Sheikh emphasizes ṣafīr requires sustained breath through the lips — practice with س for ten exhalations.");

  const lesson = allLessons[active] || allLessons[0];
  const completedCount = allLessons.filter(l => l.done).length;
  const progress = completedCount / allLessons.length;

  return (
    <div className="player">
      {/* Sidebar curriculum */}
      <aside className="player__side">
        <div className="player__side-head">
          <button className="dash__brand" onClick={() => navigate("dashboard")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer", marginBottom: 14 }}>
            <Mark size={28}/>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500 }}>Al-Qarawiyyīn</span>
          </button>
          <div className="eyebrow eyebrow--accent" style={{ marginBottom: 6 }}>{course.catLabel}</div>
          <h2>{course.title}</h2>
          <div className="player__progress">
            <span>{completedCount}/{allLessons.length}</span>
            <div className="player__progress-bar"><div className="player__progress-fill" style={{ width: `${progress * 100}%` }}/></div>
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </div>
        <div className="player__modules">
          {(course.modules || []).map((m, mi) => (
            <div key={mi}>
              <div className="player__mod-title">{m.title}</div>
              {m.lessons.map((l, li) => {
                const idx = allLessons.findIndex(x => x.mi === mi && x.li === li);
                const isActive = idx === active;
                return (
                  <button key={li} className={`player__lesson ${isActive ? "is-active" : ""}`} onClick={() => setActive(idx)}>
                    <span className="player__lesson-num">
                      {l.done ? <Icon.CheckCircle size={14}/> : isActive ? <Icon.Play size={12}/> : (mi+1)+"."+(li+1)}
                    </span>
                    <span className="player__lesson-title">{l.t}</span>
                    <span className="player__lesson-dur">{l.d}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* Main player */}
      <main className="player__main">
        <header className="player__topbar">
          <button className="btn btn--ghost btn--sm" onClick={() => navigate("dashboard")}>
            <Icon.ArrowLeft size={14}/> My library
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span className="meta">Lesson {active + 1} of {allLessons.length}</span>
            <button className="btn btn--secondary btn--sm">
              <Icon.Check size={14}/> Mark as complete
            </button>
          </div>
        </header>

        {/* Video */}
        <div className="player__video">
          <div className="player__video-bg"/>
          {/* Faint tile pattern */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(ornaments/tile.svg)", backgroundSize: 140, opacity: 0.05 }}/>
          <div className="player__video-content">
            <button className="player__video-play"><Icon.Play size={28} fill="var(--forest)"/></button>
            <div className="player__video-label">"{lesson.t}"</div>
            <div className="player__video-meta">Mux signed URL · 1080p · {lesson.d}</div>
          </div>
          <div className="player__video-controls">
            <span style={{ fontFamily: "var(--font-mono)" }}>06:24</span>
            <div className="player__scrubber"><div className="player__scrubber-fill"/></div>
            <span style={{ fontFamily: "var(--font-mono)" }}>{lesson.d || "19:36"}</span>
          </div>
        </div>

        {/* Lesson page */}
        <div className="player__lesson-page">
          <div className="eyebrow eyebrow--accent">{lesson.module}</div>
          <h1>{lesson.t}</h1>
          <p className="lede" style={{ maxWidth: 720 }}>
            In this lesson the Sheikh works through the seven qualities of the letters that have no opposite — beginning with <em>ṣafīr</em> (whistling) and ending with <em>istiṭālah</em>. Each is demonstrated, then practiced from a short passage.
          </p>

          {/* Tabs */}
          <div className="player__tabs">
            {[
              { k: "notes", l: "My notes" },
              { k: "resources", l: "Resources" },
              { k: "transcript", l: "Transcript" },
              { k: "arabic", l: "Arabic text" },
            ].map(t => (
              <button key={t.k} className={`player__tab ${tab === t.k ? "is-active" : ""}`} onClick={() => setTab(t.k)}>{t.l}</button>
            ))}
          </div>

          {tab === "notes" && (
            <div className="player__notes">
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Write your notes for this lesson…"/>
              <div className="meta" style={{ marginTop: 10 }}>
                <Icon.Check size={12} strokeWidth={2}/> Auto-saved · these notes appear only to you.
              </div>
            </div>
          )}

          {tab === "resources" && (
            <div className="player__resources">
              <a className="player__resource" href="#" onClick={(e) => e.preventDefault()}>
                <div className="player__resource-icon"><Icon.FileText size={28}/></div>
                <div style={{ flex: 1 }}>
                  <div className="player__resource-name">Lesson notes — Ṣifāt without opposite</div>
                  <div className="player__resource-meta">PDF · 412 KB · 6 pages</div>
                </div>
                <Icon.Download size={18}/>
              </a>
              <a className="player__resource" href="#" onClick={(e) => e.preventDefault()}>
                <div className="player__resource-icon"><Icon.FileText size={28}/></div>
                <div style={{ flex: 1 }}>
                  <div className="player__resource-name">Practice passage — Sūrat aḍ-Ḍuḥā</div>
                  <div className="player__resource-meta">PDF · 220 KB · Arabic text with diacritics</div>
                </div>
                <Icon.Download size={18}/>
              </a>
              <a className="player__resource" href="#" onClick={(e) => e.preventDefault()}>
                <div className="player__resource-icon"><Icon.FileText size={28}/></div>
                <div style={{ flex: 1 }}>
                  <div className="player__resource-name">Audio recitation — Sheikh's example</div>
                  <div className="player__resource-meta">MP3 · 3.4 MB · 5 minutes</div>
                </div>
                <Icon.Download size={18}/>
              </a>
            </div>
          )}

          {tab === "transcript" && (
            <div style={{ background: "var(--paper-2)", padding: "24px 28px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", maxHeight: 360, overflow: "auto" }}>
              <p style={{ fontSize: 15, lineHeight: 1.7 }}>
                <strong style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>00:00</strong>{" "}
                <em>Bismillāh.</em> Welcome back. Last lesson we covered the qualities with opposite — hams and jahr, shidda and rikhwa. Today we begin with the seven that stand alone…
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7 }}>
                <strong style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>02:14</strong>{" "}
                Ṣafīr means whistling. It belongs to three letters: ṣād, zāy, and sīn. To produce it correctly, the breath must be sustained through a narrow opening at the lips…
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 0 }}>
                <strong style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>05:42</strong>{" "}
                Qalqalah is the disturbance you hear when a sākin letter from the five — qāf, ṭāʾ, bāʾ, jīm, dāl — is articulated. Notice the small bounce…
              </p>
            </div>
          )}

          {tab === "arabic" && (
            <div style={{ background: "var(--paper-2)", padding: "32px 28px", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", textAlign: "center" }}>
              <div className="arabic" style={{ fontSize: 32, lineHeight: 2, color: "var(--ink)", direction: "rtl" }}>
                وَالضُّحَىٰ ﴿١﴾ وَاللَّيْلِ إِذَا سَجَىٰ ﴿٢﴾ مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ ﴿٣﴾
              </div>
              <hr className="rule" style={{ margin: "24px auto", maxWidth: 240 }}/>
              <p style={{ fontStyle: "italic", color: "var(--fg-2)", maxWidth: 540, margin: "0 auto" }}>
                By the morning brightness, and by the night when it grows still — your Lord has neither forsaken you nor does He hate you.
              </p>
            </div>
          )}

          {/* Lesson nav */}
          <div className="player__nav">
            <button className="btn btn--secondary btn--md" onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>
              <Icon.ArrowLeft size={14}/> Previous lesson
            </button>
            <button className="btn btn--primary btn--md" onClick={() => setActive(Math.min(allLessons.length - 1, active + 1))}>
              Next lesson <Icon.Arrow size={14}/>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

Object.assign(window, { Dashboard, LessonPlayer, DashSidebar });
