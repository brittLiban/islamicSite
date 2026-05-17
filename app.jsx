// app.jsx — main App: router + tweaks
const { useState: useStateApp, useEffect: useEffectApp } = React;
const useState = useStateApp, useEffect = useEffectApp;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "hero": "editorial",
  "palette": "forest",
  "density": "spacious"
}/*EDITMODE-END*/;

const App = () => {
  // ----- Router state -----
  const [route, setRoute] = useState(() => {
    const h = (location.hash || "#landing").slice(1);
    return h || "landing";
  });
  const [isAuthed, setIsAuthed] = useState(true);
  const [cart, setCart] = useState(window.APP_DATA.courses[0]);

  const navigate = (r) => {
    setRoute(r);
    location.hash = r;
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    const onHash = () => setRoute((location.hash || "#landing").slice(1) || "landing");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // ----- Tweaks -----
  const [t, setT] = useTweaks(TWEAK_DEFAULTS);

  // Apply palette to documentElement
  useEffect(() => {
    if (t.palette === "forest") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", t.palette);
  }, [t.palette]);

  // Apply density
  useEffect(() => {
    const d = t.density === "compact" ? 0.72 : t.density === "loose" ? 1.18 : 1;
    document.documentElement.style.setProperty("--density", d);
  }, [t.density]);

  // ----- Route resolution -----
  let screen = null;
  const parts = route.split("/");
  const head = parts[0];

  const enrichedTweaks = { ...t, isAuthed };
  const onAuth = () => setIsAuthed(true);
  const onLogout = () => { setIsAuthed(false); navigate("landing"); };

  if (head === "landing" || head === "about" || head === "contact") {
    screen = <Landing navigate={navigate} tweaks={enrichedTweaks}/>;
  } else if (head === "catalog") {
    screen = <Catalog navigate={navigate} tweaks={enrichedTweaks}/>;
  } else if (head === "course") {
    screen = <CourseDetail navigate={navigate} slug={parts[1]} tweaks={enrichedTweaks} onEnroll={setCart}/>;
  } else if (head === "login") {
    screen = <Login navigate={navigate} onAuth={onAuth}/>;
  } else if (head === "signup") {
    screen = <Signup navigate={navigate} onAuth={onAuth}/>;
  } else if (head === "checkout") {
    screen = <Checkout navigate={navigate} cart={cart} onComplete={() => onAuth()}/>;
  } else if (head === "checkout-success") {
    screen = <CheckoutSuccess navigate={navigate} cart={cart}/>;
  } else if (head === "dashboard") {
    screen = <Dashboard navigate={navigate} tweaks={enrichedTweaks}/>;
  } else if (head === "lesson") {
    screen = <LessonPlayer navigate={navigate} slug={parts[1]} lessonIdx={parts[2]} tweaks={enrichedTweaks}/>;
  } else if (head === "admin") {
    screen = <Admin navigate={navigate} tweaks={enrichedTweaks}/>;
  } else {
    screen = <Landing navigate={navigate} tweaks={enrichedTweaks}/>;
  }

  return (
    <>
      {screen}

      {/* Demo controls — small floating panel that lets you jump screens */}
      <DemoNav route={route} navigate={navigate} isAuthed={isAuthed} onLogout={onLogout} onLogin={onAuth}/>

      {/* Tweaks */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="Hero layout">
          <TweakRadio label="Variant" value={t.hero} onChange={(v) => setT('hero', v)}
                      options={[
                        { label: "Arch", value: "archway" },
                        { label: "Shelf", value: "bookshelf" },
                        { label: "Edit.", value: "editorial" },
                      ]}/>
        </TweakSection>
        <TweakSection label="Color accent">
          <TweakRadio label="Palette" value={t.palette} onChange={(v) => setT('palette', v)}
                      options={[
                        { label: "Forest",     value: "forest" },
                        { label: "Terracotta", value: "terracotta" },
                        { label: "Slate",      value: "slate" },
                        { label: "Umber",      value: "umber" },
                      ]}/>
        </TweakSection>
        <TweakSection label="Density">
          <TweakRadio label="Spacing" value={t.density} onChange={(v) => setT('density', v)}
                      options={[
                        { label: "Compact",  value: "compact" },
                        { label: "Spacious", value: "spacious" },
                        { label: "Loose",    value: "loose" },
                      ]}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

// ============================================================
// Demo nav — a small bottom-left switcher for jumping screens.
// Hides itself on lesson player to keep that view clean.
// ============================================================
const DemoNav = ({ route, navigate, isAuthed, onLogout, onLogin }) => {
  const [open, setOpen] = useState(false);
  const sections = [
    { label: "Public", items: [
      { k: "landing", l: "Landing" },
      { k: "catalog", l: "Catalogue" },
      { k: "course/tajweed-foundations", l: "Course detail" },
    ]},
    { label: "Auth", items: [
      { k: "login", l: "Sign in" },
      { k: "signup", l: "Sign up" },
    ]},
    { label: "Purchase", items: [
      { k: "checkout", l: "Checkout" },
      { k: "checkout-success", l: "Confirmation" },
    ]},
    { label: "Student", items: [
      { k: "dashboard", l: "Dashboard" },
      { k: "lesson/tajweed-foundations/5", l: "Lesson player" },
    ]},
    { label: "Instructor", items: [
      { k: "admin", l: "Admin overview" },
    ]},
  ];

  return (
    <div style={{ position: "fixed", left: 16, bottom: 16, zIndex: 100 }}>
      {open && (
        <div style={{ background: "var(--paper)", border: "1px solid var(--border-strong)", borderRadius: "var(--radius-md)", padding: "10px 0", marginBottom: 8, width: 220, boxShadow: "var(--shadow-lg)", maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 14px 8px", borderBottom: "1px solid var(--border-soft)" }}>
            <div className="eyebrow eyebrow--accent">Demo · jump to</div>
            <button onClick={() => setOpen(false)} style={{ background: 0, border: 0, color: "var(--fg-3)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}>×</button>
          </div>
          {sections.map((s, i) => (
            <div key={i} style={{ padding: "8px 0", borderBottom: i < sections.length - 1 ? "1px solid var(--border-soft)" : 0 }}>
              <div style={{ padding: "4px 14px", fontFamily: "var(--font-sc)", fontVariant: "small-caps", letterSpacing: "var(--tracking-sc)", fontSize: 10, color: "var(--fg-3)" }}>{s.label}</div>
              {s.items.map(it => (
                <button key={it.k}
                        onClick={() => { navigate(it.k); setOpen(false); }}
                        style={{ display: "block", width: "100%", textAlign: "left", padding: "5px 14px", background: route.startsWith(it.k.split('/')[0]) ? "var(--paper-2)" : "transparent", border: 0, fontFamily: "var(--font-body)", fontSize: 13, color: route.startsWith(it.k.split('/')[0]) ? "var(--accent)" : "var(--fg-2)", cursor: "pointer" }}>
                  {it.l}
                </button>
              ))}
            </div>
          ))}
          <div style={{ padding: "10px 14px 6px", borderTop: "1px solid var(--border-soft)" }}>
            {isAuthed ? (
              <button className="btn btn--ghost btn--sm" style={{ padding: 0, fontSize: 12 }} onClick={() => { onLogout(); setOpen(false); }}>Sign out (currently signed in)</button>
            ) : (
              <button className="btn btn--ghost btn--sm" style={{ padding: 0, fontSize: 12 }} onClick={() => { onLogin(); setOpen(false); }}>Sign in (currently signed out)</button>
            )}
          </div>
        </div>
      )}
      <button onClick={() => setOpen(!open)}
              style={{ background: "var(--forest)", color: "var(--gold-2)", border: "1px solid var(--gold-3)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontFamily: "var(--font-sc)", fontVariant: "small-caps", letterSpacing: "var(--tracking-sc)", fontSize: 11, cursor: "pointer", boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: 8 }}>
        <Star8 size={14} color="var(--gold-2)" filled/>
        Jump to screen
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
