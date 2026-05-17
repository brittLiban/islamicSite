// screens-admin.jsx — Admin/Instructor dashboard
const { useState: useStateS4 } = React;
const useState = useStateS4;

const Admin = ({ navigate, tweaks }) => {
  const data = window.APP_DATA;
  const [tab, setTab] = useState("overview");

  const nav = [
    { key: "overview",  label: "Overview",   icon: <Icon.Home size={18}/> },
    { key: "courses",   label: "Courses",    icon: <Icon.Library size={18}/>, count: data.courses.length },
    { key: "students",  label: "Students",   icon: <Icon.Users size={18}/>, count: data.instructor.students },
    { key: "revenue",   label: "Revenue",    icon: <Icon.Coin size={18}/> },
    { key: "coupons",   label: "Discount codes", icon: <Icon.Receipt size={18}/>, count: 3 },
  ];

  return (
    <div className="dash">
      <DashSidebar items={nav} active={tab} onSelect={setTab} navigate={navigate} label="Instructor"/>

      <main className="dash__main">
        <header className="dash__topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="eyebrow eyebrow--accent">Instructor · {data.instructor.name}</div>
            <span className="badge badge--gold">Admin</span>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span className="meta">As-salāmu ʿalaykum, <strong style={{ fontStyle: "normal", color: "var(--ink)" }}>Sheikh</strong></span>
            <button className="btn btn--primary btn--sm" onClick={() => setTab("courses")}>
              <Icon.Plus size={14}/> New course
            </button>
          </div>
        </header>

        <div className="dash__page">
          {tab === "overview" && <AdminOverview/>}
          {tab === "courses" && <AdminCourses/>}
          {tab === "students" && <AdminStudents/>}
          {tab === "revenue" && <AdminRevenue/>}
          {tab === "coupons" && <AdminCoupons/>}
        </div>
      </main>
    </div>
  );
};

const AdminOverview = () => {
  const data = window.APP_DATA;
  return (
    <>
      <div className="dash__page-head">
        <div>
          <div className="eyebrow eyebrow--accent">Overview</div>
          <h1>The <em>academy</em>, at a glance.</h1>
          <p>Twelve months. May 2025 — May 2026.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary btn--md">Last 30 days</button>
          <button className="btn btn--secondary btn--md">Export CSV</button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__label">Total revenue</div>
          <div className="admin-stat__val">$<em>412,890</em></div>
          <div className="admin-stat__delta">↑ 18.4% vs. last year</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Active students</div>
          <div className="admin-stat__val">{data.instructor.students.toLocaleString()}</div>
          <div className="admin-stat__delta">↑ 312 in May</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Courses published</div>
          <div className="admin-stat__val">{data.courses.length}</div>
          <div className="admin-stat__delta">2 in draft</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Average rating</div>
          <div className="admin-stat__val">{data.instructor.rating}<span style={{ fontSize: 22, color: "var(--fg-3)" }}>/5</span></div>
          <div className="admin-stat__delta">From 4,612 reviews</div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="tabletop" style={{ marginBottom: 36 }}>
        <div className="tabletop__head">
          <div>
            <div className="eyebrow">Revenue by month</div>
            <div className="tabletop__title">Twelve-month <em style={{ color: "var(--accent)", fontStyle: "italic" }}>plate</em></div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="chip is-active">Revenue</button>
            <button className="chip">Enrollments</button>
            <button className="chip">Refunds</button>
          </div>
        </div>
        <div style={{ padding: "32px 24px 24px", position: "relative" }}>
          <RevenueChart/>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div className="tabletop">
          <div className="tabletop__head">
            <div>
              <div className="eyebrow">Top-performing courses</div>
              <div className="tabletop__title">By revenue</div>
            </div>
          </div>
          <table className="tbl">
            <tbody>
              {data.courses.slice(0, 5).map((c, i) => (
                <tr key={c.id}>
                  <td><span className="tbl__id">{["I","II","III","IV","V"][i]}</span></td>
                  <td><strong style={{ fontFamily: "var(--font-display)", fontSize: 17 }}>{c.title}</strong>
                    <div className="meta">{c.students.toLocaleString()} students · ${c.price}</div>
                  </td>
                  <td className="tbl__money" style={{ textAlign: "right" }}>${(c.students * c.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="tabletop">
          <div className="tabletop__head">
            <div>
              <div className="eyebrow">Recent enrollments</div>
              <div className="tabletop__title">This week</div>
            </div>
            <button className="btn btn--ghost btn--sm">View all</button>
          </div>
          <table className="tbl">
            <tbody>
              {data.recentEnrollments.slice(0, 5).map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--paper-3)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 600 }}>
                        {e.name[0]}
                      </div>
                      <div>
                        <div style={{ fontSize: 14 }}>{e.name}</div>
                        <div className="meta">{e.course}</div>
                      </div>
                    </div>
                  </td>
                  <td className="meta" style={{ textAlign: "right", fontStyle: "italic" }}>{e.date}</td>
                  <td className="tbl__money" style={{ textAlign: "right" }}>${e.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

// Simple SVG revenue chart — sparkline style with bars
const RevenueChart = () => {
  const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May"];
  const vals  = [22, 28, 24, 31, 35, 41, 38, 44, 48, 52, 49, 58];
  const max = 60;
  return (
    <svg viewBox="0 0 720 200" width="100%" height="200">
      {/* gridlines */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1="0" y1={i * 50} x2="720" y2={i * 50} stroke="var(--border-soft)" strokeWidth="0.5"/>
      ))}
      {/* gridline labels */}
      {[60, 40, 20, 0].map((v, i) => (
        <text key={v} x="0" y={i * 50 + 4} fill="var(--fg-3)" fontFamily="JetBrains Mono" fontSize="9">${v}k</text>
      ))}
      {/* bars */}
      {vals.map((v, i) => {
        const h = (v / max) * 200;
        const x = 40 + i * 55;
        return (
          <g key={i}>
            <rect x={x} y={200 - h} width="32" height={h} fill="var(--accent)" rx="2"/>
            <rect x={x} y={200 - h} width="32" height="4" fill="var(--gold-2)"/>
            <text x={x + 16} y="216" textAnchor="middle" fill="var(--fg-3)" fontFamily="Source Serif 4" fontSize="11">{months[i]}</text>
            <text x={x + 16} y={200 - h - 6} textAnchor="middle" fill="var(--ink)" fontFamily="Cormorant Garamond" fontSize="12" fontStyle="italic">${v}k</text>
          </g>
        );
      })}
    </svg>
  );
};

// ============================================================
// COURSES (admin) — list + builder
// ============================================================
const AdminCourses = () => {
  const data = window.APP_DATA;
  const [editing, setEditing] = useState(null);

  if (editing) return <AdminCourseBuilder course={editing} onBack={() => setEditing(null)}/>;

  return (
    <>
      <div className="dash__page-head">
        <div>
          <h1>Your <em>courses</em>.</h1>
          <p>Published, draft, and ready to record.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary btn--md">Import from YouTube</button>
          <button className="btn btn--primary btn--md" onClick={() => setEditing(data.courses[0])}>
            <Icon.Plus size={14}/> New course
          </button>
        </div>
      </div>

      <div className="tabletop">
        <table className="tbl">
          <thead><tr><th>Course</th><th>Category</th><th>Status</th><th style={{ textAlign: "right" }}>Students</th><th style={{ textAlign: "right" }}>Revenue</th><th style={{ textAlign: "right" }}>Rating</th><th></th></tr></thead>
          <tbody>
            {data.courses.map((c, i) => (
              <tr key={c.id}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 44, height: 60, flexShrink: 0 }}><BookCover course={c}/></div>
                    <div>
                      <strong style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 500 }}>{c.title}</strong>
                      <div className="meta">{c.lessons} lessons · {c.duration}</div>
                    </div>
                  </div>
                </td>
                <td><span className={`badge badge--${c.coverColor === "gold" ? "gold" : c.coverColor === "clay" ? "clay" : c.coverColor === "slate" ? "slate" : "forest"}`}>{c.catLabel}</span></td>
                <td>{i < 6 ? <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--forest-3)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--forest-3)" }}/> Published</span> : <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--clay-2)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--clay)" }}/> Draft</span>}</td>
                <td style={{ textAlign: "right" }}>{c.students.toLocaleString()}</td>
                <td className="tbl__money" style={{ textAlign: "right" }}>${(c.students * c.price).toLocaleString()}</td>
                <td style={{ textAlign: "right" }}>{c.rating} <Icon.Star size={12}/></td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn btn--ghost btn--sm" onClick={() => setEditing(c)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AdminCourseBuilder = ({ course, onBack }) => {
  const [title, setTitle] = useState(course.title);
  const [arabic, setArabic] = useState(course.arabic);
  const [price, setPrice] = useState(course.price);
  const [pub, setPub] = useState(true);

  return (
    <>
      <div className="dash__page-head">
        <div>
          <button className="btn btn--ghost btn--sm" onClick={onBack} style={{ marginBottom: 8 }}>
            <Icon.ArrowLeft size={14}/> Back to courses
          </button>
          <h1>Edit <em>course</em>.</h1>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)", fontStyle: "italic" }}>
            <input type="checkbox" checked={pub} onChange={(e) => setPub(e.target.checked)} style={{ accentColor: "var(--accent)" }}/>
            {pub ? "Published" : "Draft"}
          </label>
          <button className="btn btn--secondary btn--md">Preview</button>
          <button className="btn btn--primary btn--md">Save changes</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }}>
        <div>
          {/* Course meta */}
          <div className="card" style={{ background: "var(--paper-2)", padding: 28, marginBottom: 24 }}>
            <div className="eyebrow eyebrow--accent" style={{ marginBottom: 16 }}>Course details</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field label="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
              <Field label="Arabic title" value={arabic} onChange={(e) => setArabic(e.target.value)} style={{ fontFamily: "var(--font-arabic)", direction: "rtl", fontSize: 18 }}/>
              <Field label="Somali title" defaultValue={course.somali}/>
              <Field label="URL slug" defaultValue={course.slug}/>
              <div className="field-row">
                <span className="label">Description</span>
                <textarea className="field" rows={4} defaultValue={course.blurb} style={{ resize: "vertical", fontFamily: "var(--font-body)" }}/>
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                <Field label="Price (USD)" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
                <div className="field-row" style={{ flex: 1 }}>
                  <span className="label">Category</span>
                  <select className="field" defaultValue={course.cat}>
                    {window.APP_DATA.categories.filter(c => c.id !== "all").map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>
                <div className="field-row" style={{ flex: 1 }}>
                  <span className="label">Level</span>
                  <select className="field" defaultValue={course.level}>
                    <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All levels</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum builder */}
          <div className="card" style={{ background: "var(--paper-2)", padding: 28, marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <div>
                <div className="eyebrow eyebrow--accent">Curriculum</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginTop: 4 }}>Modules &amp; lessons</h3>
              </div>
              <button className="btn btn--secondary btn--sm"><Icon.Plus size={14}/> Add module</button>
            </div>
            {(course.modules || []).map((m, mi) => (
              <div key={mi} style={{ marginBottom: 14, border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--paper)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--border-soft)", background: "var(--paper-2)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--accent)", fontSize: 24 }}>{["I","II","III","IV"][mi]}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500 }}>{m.title}</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn--ghost btn--sm">Rename</button>
                    <button className="btn btn--ghost btn--sm">Reorder</button>
                    <button className="btn btn--ghost btn--sm" style={{ color: "var(--oxblood, #8B4346)" }}>Delete</button>
                  </div>
                </div>
                <div>
                  {m.lessons.map((l, li) => (
                    <div key={li} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", borderBottom: "1px solid var(--border-soft)", fontSize: 14 }}>
                      <span style={{ fontFamily: "var(--font-mono)", color: "var(--fg-3)", fontSize: 12, minWidth: 28 }}>{(mi+1)+"."+(li+1)}</span>
                      <span style={{ flex: 1 }}>{l.t}</span>
                      {l.free && <span className="badge badge--gold">Free</span>}
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--fg-3)" }}>{l.d}</span>
                      <button className="btn btn--ghost btn--sm">Edit</button>
                    </div>
                  ))}
                  <button className="btn btn--ghost btn--sm" style={{ margin: 12 }}><Icon.Plus size={12}/> Add lesson</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <aside>
          <div className="card" style={{ padding: 20, background: "var(--paper-2)", marginBottom: 20 }}>
            <div className="eyebrow eyebrow--accent" style={{ marginBottom: 14 }}>Cover preview</div>
            <BookCover course={course}/>
            <button className="btn btn--secondary btn--sm" style={{ width: "100%", marginTop: 14 }}>Change cover</button>
          </div>
          <div className="card" style={{ padding: 20, background: "var(--paper-2)", marginBottom: 20 }}>
            <div className="eyebrow eyebrow--accent" style={{ marginBottom: 14 }}>Video host</div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--paper)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-sm)" }}>
              <div style={{ width: 8, height: 8, background: "var(--forest-3)", borderRadius: "50%" }}/>
              <div style={{ flex: 1, fontSize: 13 }}>Mux · all signed URLs healthy</div>
            </div>
            <div className="meta" style={{ marginTop: 10 }}>Last sync: 4 minutes ago</div>
          </div>
          <div className="card" style={{ padding: 20, background: "var(--paper-2)" }}>
            <div className="eyebrow eyebrow--accent" style={{ marginBottom: 14 }}>SEO</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Field label="Meta title" defaultValue={`${course.title} · Al-Qarawiyyīn`}/>
              <div className="field-row">
                <span className="label">OG image</span>
                <button className="btn btn--secondary btn--sm">Auto-generate from cover</button>
              </div>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--fg-2)" }}>
                <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }}/>
                Add Course schema (structured data)
              </label>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};

const AdminStudents = () => {
  const data = window.APP_DATA;
  return (
    <>
      <div className="dash__page-head">
        <div>
          <h1>Your <em>students</em>.</h1>
          <p>Every enrolled seeker, with their progress and last activity.</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn btn--secondary btn--md">Export CSV</button>
          <button className="btn btn--secondary btn--md">Send a note to all</button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <button className="chip is-active">All ({data.instructor.students.toLocaleString()})</button>
        <button className="chip">Active this week (1,204)</button>
        <button className="chip">New this month (312)</button>
        <button className="chip">Completed a course (528)</button>
        <button className="chip">By course…</button>
        <div style={{ flex: 1 }}/>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--paper)", border: "1px solid var(--border-strong)", padding: "6px 12px", borderRadius: "var(--radius-xs)", minWidth: 240 }}>
          <Icon.Search size={14}/>
          <input placeholder="Find a student…" style={{ flex: 1, border: 0, outline: 0, background: "transparent", fontFamily: "var(--font-body)", fontSize: 13, fontStyle: "italic" }}/>
        </div>
      </div>

      <div className="tabletop">
        <table className="tbl">
          <thead><tr><th>Student</th><th>Courses</th><th>Last active</th><th>Progress</th><th style={{ textAlign: "right" }}>Lifetime value</th><th></th></tr></thead>
          <tbody>
            {[
              { n: "Layla Abdullahi", e: "layla@example.com", v: 3, p: 0.42, a: "2 hours ago", ltv: 277 },
              { n: "Yusuf Diallo", e: "yusuf@example.com", v: 2, p: 0.78, a: "Yesterday", ltv: 218 },
              { n: "Khadija Mohamed", e: "khadija@example.com", v: 5, p: 0.91, a: "3 days ago", ltv: 504 },
              { n: "Mohammed Sayed", e: "mohammed@example.com", v: 1, p: 0.12, a: "1 week ago", ltv: 99 },
              { n: "Hawa Jamal", e: "hawa@example.com", v: 4, p: 0.66, a: "Yesterday", ltv: 401 },
              { n: "Ibrahim Touré", e: "ibrahim@example.com", v: 2, p: 0.34, a: "4 hours ago", ltv: 168 },
              { n: "Sumaya Yusuf", e: "sumaya@example.com", v: 3, p: 0.52, a: "Today", ltv: 257 },
              { n: "Omar Karim", e: "omar@example.com", v: 1, p: 1.00, a: "6 days ago", ltv: 69 },
            ].map((s, i) => (
              <tr key={i}>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--forest)", color: "var(--paper)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13 }}>{s.n[0]}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600 }}>{s.n}</div>
                      <div className="meta">{s.e}</div>
                    </div>
                  </div>
                </td>
                <td>{s.v}</td>
                <td className="meta">{s.a}</td>
                <td style={{ minWidth: 160 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flex: 1, height: 3, background: "var(--paper-3)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${s.p * 100}%`, background: s.p === 1 ? "var(--forest-3)" : "var(--accent)" }}/>
                    </div>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--fg-3)", minWidth: 32 }}>{Math.round(s.p * 100)}%</span>
                  </div>
                </td>
                <td className="tbl__money" style={{ textAlign: "right" }}>${s.ltv}</td>
                <td style={{ textAlign: "right" }}>
                  <button className="btn btn--ghost btn--sm"><Icon.Eye size={14}/></button>
                  <button className="btn btn--ghost btn--sm"><Icon.Mail size={14}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AdminRevenue = () => {
  const data = window.APP_DATA;
  return (
    <>
      <div className="dash__page-head">
        <div>
          <h1>Revenue &amp; <em>payments</em>.</h1>
          <p>Every Stripe transaction, with refunds and chargebacks called out.</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Icon.Stripe size={22}/>
          <span className="meta">Stripe · acct_1ABC4D…</span>
          <button className="btn btn--secondary btn--md">View in Stripe</button>
        </div>
      </div>

      <div className="admin-stats">
        <div className="admin-stat">
          <div className="admin-stat__label">This month</div>
          <div className="admin-stat__val">$<em>58,420</em></div>
          <div className="admin-stat__delta">vs $49,180 in April</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Net payouts</div>
          <div className="admin-stat__val">$56,107</div>
          <div className="admin-stat__delta">Stripe fees: $2,313</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">Refunds</div>
          <div className="admin-stat__val">$<em>178</em></div>
          <div className="admin-stat__delta">2 refunds this month</div>
        </div>
        <div className="admin-stat">
          <div className="admin-stat__label">MRR (subs)</div>
          <div className="admin-stat__val">$<em>4,120</em></div>
          <div className="admin-stat__delta">82 active subscriptions</div>
        </div>
      </div>

      <div className="tabletop">
        <div className="tabletop__head">
          <div>
            <div className="eyebrow">All payments</div>
            <div className="tabletop__title">Most recent first</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="chip is-active">All</button>
            <button className="chip">Succeeded</button>
            <button className="chip">Refunded</button>
            <button className="chip">Disputed</button>
          </div>
        </div>
        <table className="tbl">
          <thead><tr><th>Date</th><th>Reference</th><th>Student</th><th>Course</th><th>Method</th><th>Status</th><th style={{ textAlign: "right" }}>Amount</th></tr></thead>
          <tbody>
            {data.recentEnrollments.map(e => (
              <tr key={e.id}>
                <td>{e.date}</td>
                <td className="tbl__id">{e.id.replace("ENR", "ch_3OqW2k")}…{e.id.slice(-3)}</td>
                <td>{e.name}</td>
                <td style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500 }}>{e.course}</td>
                <td className="meta">Visa · 4242</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "var(--forest-3)" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--forest-3)" }}/> Succeeded</span></td>
                <td className="tbl__money" style={{ textAlign: "right" }}>${e.amount}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const AdminCoupons = () => (
  <>
    <div className="dash__page-head">
      <div>
        <h1>Discount <em>codes</em>.</h1>
        <p>Coupons you've created. Share with mailing lists or specific cohorts.</p>
      </div>
      <button className="btn btn--primary btn--md"><Icon.Plus size={14}/> New code</button>
    </div>
    <div className="tabletop">
      <table className="tbl">
        <thead><tr><th>Code</th><th>Discount</th><th>Uses</th><th>Restricted to</th><th>Expires</th><th></th></tr></thead>
        <tbody>
          {[
            { code: "RAMADAN26", d: "30%", uses: "184 / 500", scope: "All courses", exp: "30 March 2026" },
            { code: "STUDENT15", d: "15%", uses: "92 / ∞", scope: "All courses",  exp: "—" },
            { code: "TAJWEED50", d: "50%", uses: "31 / 100", scope: "Foundations of Tajwīd", exp: "31 May 2026" },
          ].map((c, i) => (
            <tr key={i}>
              <td><code style={{ background: "var(--paper-3)", padding: "2px 8px", borderRadius: 2, fontSize: 13 }}>{c.code}</code></td>
              <td className="tbl__money">{c.d}</td>
              <td>{c.uses}</td>
              <td className="meta">{c.scope}</td>
              <td className="meta">{c.exp}</td>
              <td style={{ textAlign: "right" }}><button className="btn btn--ghost btn--sm">Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

Object.assign(window, { Admin });
