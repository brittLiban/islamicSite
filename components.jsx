// components.jsx — Topnav, Footer, and shared building blocks

const { useState, useEffect, useRef, useMemo } = React;

// ---- Top navigation (public + dashboard share with variants) ----
const TopNav = ({ route, navigate, isAuthed, onLogout, density = "normal" }) => {
  const links = [
    { key: "landing",  label: "Home" },
    { key: "catalog",  label: "Courses" },
    { key: "about",    label: "About" },
    { key: "contact",  label: "Contact" },
  ];
  return (
    <nav className="topnav">
      <div className="topnav__inner">
        <button className="topnav__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer" }}>
          <Mark size={38}/>
          <span>
            Al-Qarawiyyīn
            <span className="topnav__brand-arabic"> · القرويين</span>
          </span>
        </button>
        <div className="topnav__links">
          {links.map(l => (
            <button key={l.key}
                    className={`topnav__link ${route.startsWith(l.key) ? "is-active" : ""}`}
                    onClick={() => navigate(l.key === "about" ? "landing" : l.key === "contact" ? "landing" : l.key)}>
              {l.label}
            </button>
          ))}
        </div>
        <div className="topnav__actions">
          {isAuthed ? (
            <>
              <button className="btn btn--ghost btn--md" onClick={() => navigate("dashboard")}>My library</button>
              <button className="btn btn--primary btn--md" onClick={onLogout}>Sign out</button>
            </>
          ) : (
            <>
              <button className="btn btn--ghost btn--md" onClick={() => navigate("login")}>Sign in</button>
              <button className="btn btn--primary btn--md" onClick={() => navigate("signup")}>Enroll</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// ---- Footer ----
const Footer = ({ navigate }) => (
  <footer className="footer">
    <div className="footer__inner">
      <div className="footer__top">
        <div>
          <div style={{display: "flex", alignItems: "center", gap: 12}}>
            <Mark size={36}/>
            <strong style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>Al-Qarawiyyīn Academy</strong>
          </div>
          <div className="footer__brand-line">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
          <p className="footer__brand-trans">In the name of God, the Most Gracious, the Most Merciful.</p>
          <p style={{ color: "rgba(245,237,216,0.62)", fontSize: 14, marginTop: 14, maxWidth: 320 }}>
            A small online madrasa, taught by Sheikh Abdulhakim. Qur'an, Arabic, Fiqh, ʿAqīdah — at the pace of a seminary.
          </p>
        </div>
        <div>
          <h4>Study</h4>
          <ul>
            <li><a onClick={(e) => { e.preventDefault(); navigate("catalog"); }} href="#">All courses</a></li>
            <li><a href="#">Qur'an</a></li>
            <li><a href="#">Arabic</a></li>
            <li><a href="#">Fiqh & ʿAqīdah</a></li>
            <li><a href="#">Free lessons</a></li>
          </ul>
        </div>
        <div>
          <h4>The Academy</h4>
          <ul>
            <li><a href="#">About Sheikh Abdulhakim</a></li>
            <li><a href="#">Our method</a></li>
            <li><a href="#">Ijazah & certification</a></li>
            <li><a href="#">Frequently asked</a></li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">Telegram</a></li>
            <li><a href="#">Contact us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer__bottom">
        <span>© 2026 Al-Qarawiyyīn Academy · Knowledge is light, and light cannot be hoarded.</span>
        <span style={{ fontFamily: "var(--font-mono)", fontStyle: "normal", letterSpacing: "0.04em" }}>al-qarawiyyin.academy</span>
      </div>
    </div>
  </footer>
);

// ---- Star rating display ----
const Stars = ({ value = 5, size = 14 }) => {
  return (
    <span style={{ display: "inline-flex", gap: 1, color: "var(--gold-3)" }}>
      {[0,1,2,3,4].map(i => <Icon.Star key={i} size={size}/>)}
      <span style={{ marginLeft: 6, fontSize: 13, color: "var(--fg-3)", fontStyle: "italic" }}>{value.toFixed(1)}</span>
    </span>
  );
};

// ---- Course Card (book) ----
const CourseCard = ({ course, navigate, showEnrolled }) => (
  <button className="course-card" onClick={() => navigate(`course/${course.slug}`)}>
    <div className="course-card__cover-wrap">
      <div className="course-card__cover">
        <BookCover course={course}/>
      </div>
    </div>
    <div className="course-card__meta">
      <span className={`badge badge--${course.coverColor === "gold" ? "gold" : course.coverColor === "clay" ? "clay" : course.coverColor === "slate" ? "slate" : "forest"}`}>
        {course.catLabel}
      </span>
      {showEnrolled && course.enrolled && <span className="meta" style={{ color: "var(--forest-3)", fontStyle: "italic" }}>· enrolled</span>}
    </div>
    <h3 className="course-card__title">{course.title}</h3>
    <span className="course-card__instructor">Sheikh Abdulhakim · {course.lessons} lessons</span>
    <div className="course-card__foot">
      <Stars value={course.rating}/>
      <span className="course-card__price">${course.price}</span>
    </div>
  </button>
);

// ---- Field wrapper ----
const Field = ({ label, ...rest }) => (
  <label className="field-row">
    <span className="label">{label}</span>
    <input className="field" {...rest}/>
  </label>
);

Object.assign(window, { TopNav, Footer, Stars, CourseCard, Field });
