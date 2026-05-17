// screens-auth-checkout.jsx — Login, Signup, Checkout, Success
const { useState: useStateS2 } = React;
const useState = useStateS2;

// ============================================================
// LOGIN
// ============================================================
const Login = ({ navigate, onAuth }) => {
  const [email, setEmail] = useState("student@example.com");
  const [pw, setPw] = useState("••••••••••");
  return (
    <div className="auth">
      <div className="auth__pane">
        <div className="auth__form-wrap">
          <button className="topnav__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer", marginBottom: 28 }}>
            <Mark size={36}/>
            <span>Al-Qarawiyyīn</span>
          </button>
          <h1>Welcome <em>back</em>.</h1>
          <p className="auth__lede">Return to your studies.</p>
          <form className="auth__form" onSubmit={(e) => { e.preventDefault(); onAuth(); navigate("dashboard"); }}>
            <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.name@example.com"/>
            <div>
              <Field label="Password" type="password" value={pw} onChange={(e) => setPw(e.target.value)}/>
              <a href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 13, marginTop: 8, display: "inline-block" }}>Forgot your password?</a>
            </div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--fg-2)" }}>
              <input type="checkbox" defaultChecked style={{ accentColor: "var(--accent)" }}/>
              Keep me signed in
            </label>
            <button className="btn btn--primary btn--lg" type="submit" style={{ width: "100%", marginTop: 6 }}>Sign in to my library</button>
          </form>
          <div className="auth__or">or</div>
          <button className="auth__google">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.4-.2-2.1H12v3.9h5.9c-.1.9-.7 2.3-2.1 3.2v2.6h3.4c2-1.8 3.3-4.5 3.3-7.6z"/><path fill="#34A853" d="M12 22.5c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.6 1-2.8 0-5.1-1.8-6-4.4H2.4v2.7c1.7 3.3 5.1 5.6 9.1 5.6z"/><path fill="#FBBC05" d="M6 13.9c-.2-.6-.4-1.3-.4-2s.1-1.3.4-2V7.2H2.4C1.7 8.6 1.3 10.2 1.3 12s.4 3.4 1.1 4.8L6 14z"/><path fill="#EA4335" d="M12 5.5c1.6 0 2.7.7 3.4 1.3l2.4-2.5C16.4 2.9 14.4 1.5 12 1.5 8 1.5 4.6 3.8 2.4 7.1L6 9.8C6.9 7.2 9.2 5.5 12 5.5z"/></svg>
            Continue with Google
          </button>
          <p className="auth__foot">
            New to the academy? <a href="#" onClick={(e) => { e.preventDefault(); navigate("signup"); }}>Create an account</a>
          </p>
        </div>
      </div>

      <div className="auth__pane auth__mark-pane">
        <div>
          <Mark size={56}/>
          <div className="arabic" style={{ marginTop: 32 }}>القرويين</div>
          <h2>The seminary, in the <em>palm of your hand</em>.</h2>
          <p className="lede" style={{ color: "rgba(245,237,216,0.78)", fontStyle: "italic" }}>
            Sheikh Abdulhakim's online madrasa — Qur'an, Arabic, Fiqh, and ʿAqīdah, taught at the cadence of a traditional academy.
          </p>
        </div>
        <div className="auth__quote">
          "Whoever travels a path in search of knowledge, Allah eases for him a path to Paradise."
          <span className="auth__quote-cite">Ṣaḥīḥ Muslim · 2699</span>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// SIGNUP
// ============================================================
const Signup = ({ navigate, onAuth }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", pw: "", goal: "tajweed" });

  const goals = [
    { id: "tajweed", label: "Learn to recite the Qur'an correctly", note: "Tajwīd & Qirāʾāt" },
    { id: "arabic",  label: "Read and understand Arabic", note: "Naḥw, Ṣarf & vocabulary" },
    { id: "fiqh",    label: "Practice the religion correctly", note: "Fiqh, ʿAqīdah, Sīrah" },
    { id: "all",     label: "I want a full curriculum", note: "Recommended for new students" },
  ];

  return (
    <div className="auth">
      <div className="auth__pane">
        <div className="auth__form-wrap">
          <button className="topnav__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer", marginBottom: 28 }}>
            <Mark size={36}/>
            <span>Al-Qarawiyyīn</span>
          </button>

          {step === 1 ? (
            <>
              <h1>Begin where <em>you are</em>.</h1>
              <p className="auth__lede">Create your account. It takes about a minute.</p>
              <form className="auth__form" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                <Field label="Full name" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="As you would like it on your ijazah"/>
                <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="your.name@example.com"/>
                <Field label="Password" type="password" value={form.pw} onChange={(e) => setForm({...form, pw: e.target.value})} placeholder="At least 8 characters"/>
                <button className="btn btn--primary btn--lg" type="submit" style={{ width: "100%", marginTop: 6 }}>Continue</button>
              </form>
              <div className="auth__or">or</div>
              <button className="auth__google">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.4-.2-2.1H12v3.9h5.9c-.1.9-.7 2.3-2.1 3.2v2.6h3.4c2-1.8 3.3-4.5 3.3-7.6z"/><path fill="#34A853" d="M12 22.5c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.6 1-2.8 0-5.1-1.8-6-4.4H2.4v2.7c1.7 3.3 5.1 5.6 9.1 5.6z"/><path fill="#FBBC05" d="M6 13.9c-.2-.6-.4-1.3-.4-2s.1-1.3.4-2V7.2H2.4C1.7 8.6 1.3 10.2 1.3 12s.4 3.4 1.1 4.8L6 14z"/><path fill="#EA4335" d="M12 5.5c1.6 0 2.7.7 3.4 1.3l2.4-2.5C16.4 2.9 14.4 1.5 12 1.5 8 1.5 4.6 3.8 2.4 7.1L6 9.8C6.9 7.2 9.2 5.5 12 5.5z"/></svg>
                Sign up with Google
              </button>
              <p className="auth__foot">
                Already a student? <a href="#" onClick={(e) => { e.preventDefault(); navigate("login"); }}>Sign in</a>
              </p>
            </>
          ) : (
            <>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 12 }}>Step 2 of 2</div>
              <h1>What brings you <em>here</em>?</h1>
              <p className="auth__lede">We'll suggest a starting course based on your intention.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                {goals.map(g => (
                  <button key={g.id}
                          onClick={() => setForm({...form, goal: g.id})}
                          style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "16px 18px",
                            background: form.goal === g.id ? "var(--accent-soft)" : "var(--paper)",
                            border: `1px solid ${form.goal === g.id ? "var(--accent)" : "var(--border-strong)"}`,
                            borderRadius: "var(--radius-sm)",
                            cursor: "pointer", textAlign: "left", fontFamily: "var(--font-body)", color: "var(--ink)",
                            transition: "all 150ms"
                          }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 600 }}>{g.label}</div>
                      <div style={{ fontSize: 13, color: "var(--fg-3)", fontStyle: "italic", marginTop: 2 }}>{g.note}</div>
                    </div>
                    {form.goal === g.id && <Icon.CheckCircle size={20}/>}
                  </button>
                ))}
              </div>
              <button className="btn btn--primary btn--lg" style={{ width: "100%", marginTop: 24 }}
                      onClick={() => { onAuth(); navigate("dashboard"); }}>
                Create my account
              </button>
              <button className="btn btn--ghost btn--md" style={{ marginTop: 8 }} onClick={() => setStep(1)}>
                <Icon.ArrowLeft size={14}/> Back
              </button>
            </>
          )}
        </div>
      </div>

      <div className="auth__pane auth__mark-pane">
        <div>
          <Mark size={56}/>
          <div className="arabic" style={{ marginTop: 32 }}>اقرأ بِاسْمِ رَبِّكَ</div>
          <h2 style={{ marginTop: 8 }}>"Read, in the name of <em>your Lord</em>."</h2>
          <p className="lede" style={{ color: "rgba(245,237,216,0.78)", fontStyle: "italic" }}>
            The first word revealed to the Prophet ﷺ in the cave of Ḥirāʾ — and the first word of every course at the academy.
          </p>
        </div>
        <div>
          <div className="auth__quote" style={{ paddingTop: 0, borderTop: 0 }}>
            What you receive when you join:
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "16px 0 0", display: "flex", flexDirection: "column", gap: 12, color: "rgba(245,237,216,0.85)", fontFamily: "var(--font-body)" }}>
            <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15 }}>
              <span style={{ color: "var(--gold-2)" }}><Icon.Check size={18} strokeWidth={2}/></span>
              Free preview of every course's first lesson
            </li>
            <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15 }}>
              <span style={{ color: "var(--gold-2)" }}><Icon.Check size={18} strokeWidth={2}/></span>
              A weekly note from Sheikh Abdulhakim
            </li>
            <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15 }}>
              <span style={{ color: "var(--gold-2)" }}><Icon.Check size={18} strokeWidth={2}/></span>
              No advertisements, ever
            </li>
            <li style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15 }}>
              <span style={{ color: "var(--gold-2)" }}><Icon.Check size={18} strokeWidth={2}/></span>
              A library that remembers where you stopped
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// CHECKOUT
// ============================================================
const Checkout = ({ navigate, cart, onComplete }) => {
  const course = cart;
  if (!course) {
    return (
      <div className="checkout">
        <div style={{ textAlign: "center", padding: 96 }}>
          <p>No course in your cart.</p>
          <button className="btn btn--primary btn--lg" onClick={() => navigate("catalog")}>Browse the library</button>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({
    email: "student@example.com", name: "Layla Abdullahi",
    card: "4242 4242 4242 4242", exp: "12 / 28", cvc: "123",
    country: "United States", postal: "55401",
  });
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [processing, setProcessing] = useState(false);

  const discount = couponApplied ? Math.round(course.price * 0.15 * 100) / 100 : 0;
  const subtotal = course.price;
  const total = (subtotal - discount).toFixed(2);

  const submit = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      onComplete(course);
      navigate("checkout-success");
    }, 1100);
  };

  return (
    <div className="checkout">
      <div className="checkout__inner">
        <div>
          <button className="checkout__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer" }}>
            <Mark size={36}/>
            <span>Al-Qarawiyyīn</span>
          </button>
          <div className="checkout__steps">
            <span className="checkout__step is-done"><Icon.Check size={12} strokeWidth={2}/> Cart</span>
            <span style={{ color: "var(--ink-4)" }}>—</span>
            <span className="checkout__step is-active">Payment</span>
            <span style={{ color: "var(--ink-4)" }}>—</span>
            <span className="checkout__step">Confirmation</span>
          </div>

          <h1>Complete your <em>enrollment</em>.</h1>
          <p className="meta" style={{ marginBottom: 32 }}>
            One-time payment · Lifetime access · 30-day refund if it isn't right for you.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 16 }}>Account</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}/>
                <Field label="Full name" type="text" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}/>
              </div>
            </div>

            <hr className="rule"/>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div className="eyebrow eyebrow--accent">Payment details</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--fg-3)", fontSize: 12, fontStyle: "italic" }}>
                  <Icon.Lock size={12}/> Secured by Stripe
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Card number" type="text" value={form.card} onChange={(e) => setForm({...form, card: e.target.value})} placeholder="0000 0000 0000 0000"/>
                <div className="checkout__card-row">
                  <Field label="Expiry" type="text" value={form.exp} onChange={(e) => setForm({...form, exp: e.target.value})} placeholder="MM / YY"/>
                  <Field label="CVC" type="text" value={form.cvc} onChange={(e) => setForm({...form, cvc: e.target.value})} placeholder="123"/>
                </div>
                <div className="checkout__card-row">
                  <Field label="Country" type="text" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})}/>
                  <Field label="Postal code" type="text" value={form.postal} onChange={(e) => setForm({...form, postal: e.target.value})}/>
                </div>
              </div>
            </div>

            <hr className="rule"/>

            <div>
              <div className="eyebrow eyebrow--accent" style={{ marginBottom: 10 }}>Have a discount code?</div>
              <div style={{ display: "flex", gap: 10 }}>
                <input className="field" placeholder="STUDENT15" value={coupon} onChange={(e) => setCoupon(e.target.value)} style={{ flex: 1 }}/>
                <button type="button" className="btn btn--secondary btn--md" onClick={() => setCouponApplied(true)} disabled={!coupon}>Apply</button>
              </div>
              {couponApplied && (
                <div className="meta" style={{ marginTop: 8, color: "var(--forest-3)" }}>
                  <Icon.Check size={12} strokeWidth={2}/> Code applied — 15% off
                </div>
              )}
            </div>

            <button className="btn btn--primary btn--lg" type="submit" disabled={processing} style={{ marginTop: 8 }}>
              {processing ? "Processing…" : `Pay $${total} and enroll`}
            </button>

            <p className="meta" style={{ textAlign: "center", marginTop: 4 }}>
              By completing your purchase you agree to our terms. A receipt will be sent to {form.email}.
            </p>
          </form>
        </div>

        {/* Order summary */}
        <aside className="checkout__summary">
          <h3>Your enrollment</h3>
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <div style={{ width: 80, flexShrink: 0 }}><BookCover course={course}/></div>
            <div>
              <div className="eyebrow eyebrow--accent">{course.catLabel}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, lineHeight: 1.1, marginTop: 4 }}>{course.title}</div>
              <div className="meta" style={{ marginTop: 4 }}>{course.lessons} lessons · {course.duration}</div>
            </div>
          </div>
          <div className="checkout__line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          {couponApplied && <div className="checkout__line" style={{ color: "var(--forest-3)" }}><span>STUDENT15 discount</span><span>−${discount.toFixed(2)}</span></div>}
          <div className="checkout__line"><span>Tax</span><span>—</span></div>
          <div className="checkout__line checkout__line--total"><span>Total</span><span>${total} USD</span></div>

          <div style={{ marginTop: 24, padding: 16, background: "var(--paper)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-sm)" }}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>What's included</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, display: "flex", flexDirection: "column", gap: 8 }}>
              <li style={{ display: "flex", gap: 8 }}><Icon.Check size={14} strokeWidth={2}/> {course.lessons} video lessons</li>
              <li style={{ display: "flex", gap: 8 }}><Icon.Check size={14} strokeWidth={2}/> PDF course notes</li>
              <li style={{ display: "flex", gap: 8 }}><Icon.Check size={14} strokeWidth={2}/> Ijazah on completion</li>
              <li style={{ display: "flex", gap: 8 }}><Icon.Check size={14} strokeWidth={2}/> Lifetime access</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

// ============================================================
// CHECKOUT SUCCESS
// ============================================================
const CheckoutSuccess = ({ navigate, cart }) => {
  const course = cart || window.APP_DATA.courses[0];
  return (
    <div className="checkout">
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <button className="checkout__brand" onClick={() => navigate("landing")} style={{ background: 0, border: 0, padding: 0, cursor: "pointer", justifyContent: "center", width: "100%" }}>
          <Mark size={36}/>
          <span>Al-Qarawiyyīn</span>
        </button>
        <div className="checkout__success">
          <div className="checkout__success-mark">
            <Icon.Check size={48} strokeWidth={2.5}/>
          </div>
          <div className="arabic" style={{ fontSize: 36, color: "var(--gold-3)", marginBottom: 14 }}>الْحَمْدُ لِلَّهِ</div>
          <div className="eyebrow eyebrow--accent" style={{ marginBottom: 10 }}>Enrollment confirmed</div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.015em", marginBottom: 14 }}>
            Welcome to <em>the course</em>.
          </h1>
          <p className="lede" style={{ maxWidth: 480, margin: "0 auto 28px" }}>
            A receipt has been sent to your email. You may begin reading whenever you are ready.
          </p>

          {/* Mini receipt */}
          <div className="card card--frame" style={{ padding: 28, textAlign: "left", marginBottom: 28, background: "var(--paper-2)" }}>
            <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
              <div style={{ width: 96, flexShrink: 0 }}><BookCover course={course}/></div>
              <div style={{ flex: 1 }}>
                <div className="eyebrow eyebrow--accent">{course.catLabel}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, marginTop: 4 }}>{course.title}</div>
                <div className="arabic" style={{ fontSize: 18, color: "var(--gold-3)", marginTop: 4 }}>{course.arabic}</div>
                <div className="meta" style={{ marginTop: 6 }}>{course.lessons} lessons · {course.duration} · Sheikh Abdulhakim</div>
              </div>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14, display: "grid", gridTemplateColumns: "max-content 1fr", gap: "6px 24px", fontSize: 13 }}>
              <span className="meta">Transaction</span><span className="mono">ch_3OqW2k...3K1Ld8</span>
              <span className="meta">Date</span><span>15 May 2026</span>
              <span className="meta">Amount</span><span style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "var(--accent)" }}>${course.price}.00 USD</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <button className="btn btn--primary btn--lg" onClick={() => navigate(`lesson/${course.slug}/0`)}>
              <Icon.PlayCircle size={18}/> Begin the first lesson
            </button>
            <button className="btn btn--secondary btn--lg" onClick={() => navigate("dashboard")}>Go to my library</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { Login, Signup, Checkout, CheckoutSuccess });
