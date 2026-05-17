// motifs.jsx — SVG library: arch, star, ornaments, book cover, brand mark

const Mark = ({ size = 38 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="60" height="60" rx="3" fill="var(--forest)"/>
    <rect x="4.5" y="4.5" width="55" height="55" rx="2" fill="none" stroke="var(--gold)" strokeWidth="0.6"/>
    <path d="M 16 52 L 16 32 Q 16 16 32 12 Q 48 16 48 32 L 48 52 Z"
          fill="none" stroke="var(--gold-2)" strokeWidth="1.6" strokeLinejoin="round"/>
    <path d="M 22 32 Q 22 22 32 18 Q 42 22 42 32" fill="none" stroke="var(--gold-2)" strokeWidth="0.8"/>
    <g transform="translate(32,34)" fill="var(--gold-2)">
      <polygon points="0,-6 1.7,-1.7 6,0 1.7,1.7 0,6 -1.7,1.7 -6,0 -1.7,-1.7"/>
      <polygon points="0,-6 1.7,-1.7 6,0 1.7,1.7 0,6 -1.7,1.7 -6,0 -1.7,-1.7" transform="rotate(45)"/>
    </g>
    <line x1="14" y1="54" x2="50" y2="54" stroke="var(--gold)" strokeWidth="0.5"/>
  </svg>
);

// 8-point star — used in dividers and as a single ornament
const Star8 = ({ size = 18, color = "currentColor", filled = false, strokeWidth = 1 }) => (
  <svg width={size} height={size} viewBox="-12 -12 24 24" fill={filled ? color : "none"}
       stroke={color} strokeWidth={strokeWidth} aria-hidden="true">
    <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3"/>
    <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" transform="rotate(45)"/>
  </svg>
);

// Ornamental divider — long horizontal rule with 8-point star + dots
const Divider = ({ width = 320, color = "var(--gold-3)" }) => (
  <svg width={width} height="24" viewBox="0 0 320 24" fill="none" aria-hidden="true"
       style={{ display: "block", margin: "0 auto" }}>
    <g stroke={color} strokeWidth="0.8" fill="none">
      <line x1="0" y1="12" x2="124" y2="12"/>
      <line x1="196" y1="12" x2="320" y2="12"/>
    </g>
    <g transform="translate(160,12)" fill={color}>
      <polygon points="0,-9 2.6,-2.6 9,0 2.6,2.6 0,9 -2.6,2.6 -9,0 -2.6,-2.6" fill="none" stroke={color} strokeWidth="0.9"/>
      <polygon points="0,-9 2.6,-2.6 9,0 2.6,2.6 0,9 -2.6,2.6 -9,0 -2.6,-2.6" transform="rotate(45)" fill="none" stroke={color} strokeWidth="0.9"/>
      <circle r="1.4"/>
      <circle r="0.9" cx="-22"/>
      <circle r="0.9" cx="22"/>
      <circle r="0.6" cx="-36"/>
      <circle r="0.6" cx="36"/>
    </g>
  </svg>
);

// Pointed Islamic arch — as a frame (open on the bottom)
const Mihrab = ({ width = 260, height = 360, fill = "var(--paper)", stroke = "var(--gold)", strokeWidth = 1.2 }) => (
  <svg width={width} height={height} viewBox="0 0 100 140" fill="none" preserveAspectRatio="xMidYMax meet">
    <path d="M 6 140 L 6 60 Q 6 14 50 4 Q 94 14 94 60 L 94 140"
          fill={fill} stroke={stroke} strokeWidth={strokeWidth}/>
    <path d="M 14 140 L 14 60 Q 14 22 50 14 Q 86 22 86 60 L 86 140"
          fill="none" stroke={stroke} strokeWidth="0.4"/>
  </svg>
);

// Lucide-style line icons (we draw our own simple ones for full control)
const Icon = {
  Book: (p) => (
    <svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19V5a2 2 0 0 1 2-2h13v18H6a2 2 0 0 0-2 2"/><path d="M19 17H6a2 2 0 0 0-2 2"/>
    </svg>
  ),
  Lamp: (p) => (
    <svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 2h6l3 7H6z"/><path d="M12 9v7"/><path d="M8 22h8"/><path d="M10 22v-6h4v6"/>
    </svg>
  ),
  Globe: (p) => (
    <svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18"/>
    </svg>
  ),
  Ribbon: (p) => (
    <svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="9" r="6"/><path d="M8.5 14l-3.5 8 7-4 7 4-3.5-8"/>
    </svg>
  ),
  Search: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/>
    </svg>
  ),
  Lock: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="10" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>
    </svg>
  ),
  Play: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill={p.fill||"currentColor"} aria-hidden="true">
      <polygon points="7,5 19,12 7,19"/>
    </svg>
  ),
  PlayCircle: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Check: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={p.strokeWidth||2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4,12 10,18 20,6"/>
    </svg>
  ),
  CheckCircle: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><polyline points="8,12 11,15 16,9"/>
    </svg>
  ),
  Arrow: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{transform: p.flip?'rotate(180deg)':undefined}}>
      <line x1="4" y1="12" x2="20" y2="12"/><polyline points="14,6 20,12 14,18"/>
    </svg>
  ),
  ArrowLeft: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="20" y1="12" x2="4" y2="12"/><polyline points="10,6 4,12 10,18"/>
    </svg>
  ),
  Home: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11l9-8 9 8"/><path d="M5 9v11h14V9"/>
    </svg>
  ),
  Library: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="3" width="3" height="18"/><rect x="9.5" y="3" width="3" height="18"/>
      <path d="m15 4 5 1-3 17-5-1z"/>
    </svg>
  ),
  GraduationCap: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5"/><line x1="22" y1="10" x2="22" y2="16"/>
    </svg>
  ),
  Receipt: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 3v18l2-2 2 2 2-2 2 2 2-2 2 2 2-2 2 2V3z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="13" y2="16"/>
    </svg>
  ),
  Settings: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.13.67.34.92.62"/>
    </svg>
  ),
  Users: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  Coin: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><path d="M15 9a3 3 0 0 0-6 0c0 4 6 1 6 6a3 3 0 0 1-6 0"/><line x1="12" y1="5" x2="12" y2="19"/>
    </svg>
  ),
  Plus: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="12" y1="4" x2="12" y2="20"/><line x1="4" y1="12" x2="20" y2="12"/>
    </svg>
  ),
  Download: (p) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  FileText: (p) => (
    <svg width={p.size||20} height={p.size||20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/>
    </svg>
  ),
  Clock: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 16,14"/>
    </svg>
  ),
  Star: (p) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="12,2 15,9 22,10 17,15 18,22 12,18 6,22 7,15 2,10 9,9"/>
    </svg>
  ),
  Stripe: (p) => (
    <svg width={p.size||22} height={p.size||22} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#635BFF"/>
      <path d="M14 11.5c0-.7.6-1 1.5-1 1.4 0 3.2.4 4.6 1.2V7.6c-1.5-.6-3-.8-4.5-.8-3.6 0-6 1.9-6 5 0 4.8 6.6 4 6.6 6.1 0 .8-.7 1-1.7 1-1.5 0-3.4-.6-5-1.4v4.2c1.7.7 3.5 1 5.1 1 3.7 0 6.2-1.8 6.2-5C20.8 12.6 14 13.5 14 11.5z" fill="#fff"/>
    </svg>
  ),
  Eye: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  ChevronDown: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={p.style}>
      <polyline points="6,9 12,15 18,9"/>
    </svg>
  ),
  Mail: (p) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
};

// ============================================================
// CoursePoster — a cinematic video-lecture poster.
// Mihrab arch frame, play button, course title overlaid,
// duration + lesson count badge. Replaces the book-cover metaphor.
// (Exported as `BookCover` for backwards-compat with screen files.)
// ============================================================
const POSTER_PALETTES = {
  forest: { bg: "#1F3D2E", bg2: "#143024", accent: "#2C5240", foil: "#DCB65E", foilDim: "#A8893B", text: "#F5EDD8" },
  clay:   { bg: "#7E4D2A", bg2: "#5A381F", accent: "#A3683E", foil: "#F0DAA0", foilDim: "#D9B568", text: "#FBF1DA" },
  umber:  { bg: "#3D2A1F", bg2: "#241712", accent: "#5C4234", foil: "#DCB65E", foilDim: "#A8893B", text: "#F5EDD8" },
  gold:   { bg: "#7E6724", bg2: "#5A4818", accent: "#A8893B", foil: "#FBF1DA", foilDim: "#3D2A1F", text: "#FBF1DA" },
  slate:  { bg: "#475D70", bg2: "#2F3F4F", accent: "#5D768D", foil: "#DCB65E", foilDim: "#B8A47F", text: "#F5EDD8" },
};

const BookCover = ({ course, height = "100%", showPlay = true, ratio = "3/2" }) => {
  const palette = POSTER_PALETTES[course.coverColor] || POSTER_PALETTES.forest;
  const id = course.id;
  // 480 × 320 viewBox (3:2)
  const W = 480, H = 320;
  const lessonsLabel = course.lessons ? `${course.lessons} lessons` : "Video series";
  const durLabel = course.duration || "";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice"
         style={{ width: "100%", height, display: "block", borderRadius: "var(--radius-md)", overflow: "hidden", filter: "drop-shadow(0 12px 24px rgba(40,24,12,0.28))" }}
         aria-label={course.title}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.bg}/>
          <stop offset="1" stopColor={palette.bg2}/>
        </linearGradient>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.bg2} stopOpacity="0"/>
          <stop offset="0.4" stopColor={palette.bg2} stopOpacity="0.4"/>
          <stop offset="1" stopColor={palette.bg2} stopOpacity="0.95"/>
        </linearGradient>
        <radialGradient id={`spot-${id}`} cx="0.5" cy="0.42" r="0.55">
          <stop offset="0" stopColor={palette.foil} stopOpacity="0.18"/>
          <stop offset="1" stopColor={palette.foil} stopOpacity="0"/>
        </radialGradient>
        <filter id={`grain-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={String(id).length}/>
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.11 0"/>
        </filter>
      </defs>

      {/* Ground */}
      <rect width={W} height={H} fill={`url(#bg-${id})`}/>
      <rect width={W} height={H} fill={`url(#spot-${id})`}/>

      {/* Faint tile pattern — three rows of 8-point stars */}
      <g stroke={palette.foil} strokeWidth="0.5" fill="none" opacity="0.10">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i =>
          [0, 1, 2, 3, 4].map(j => (
            <g key={`${i}-${j}`} transform={`translate(${30 + i * 56},${30 + j * 56 + (i % 2) * 28})`}>
              <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3"/>
              <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" transform="rotate(45)"/>
            </g>
          ))
        )}
      </g>

      {/* Grain */}
      <rect width={W} height={H} filter={`url(#grain-${id})`} opacity="0.7"/>

      {/* Mihrab arch — large outlined frame */}
      <g stroke={palette.foil} fill="none" opacity="0.85">
        <path d={`M ${W/2 - 90} ${H + 20} L ${W/2 - 90} ${H/2 + 10} Q ${W/2 - 90} ${H/2 - 60} ${W/2} ${H/2 - 88} Q ${W/2 + 90} ${H/2 - 60} ${W/2 + 90} ${H/2 + 10} L ${W/2 + 90} ${H + 20}`}
              strokeWidth="1.3"/>
        <path d={`M ${W/2 - 78} ${H + 20} L ${W/2 - 78} ${H/2 + 10} Q ${W/2 - 78} ${H/2 - 48} ${W/2} ${H/2 - 76} Q ${W/2 + 78} ${H/2 - 48} ${W/2 + 78} ${H/2 + 10} L ${W/2 + 78} ${H + 20}`}
              strokeWidth="0.5" opacity="0.6"/>
      </g>

      {/* Center play button */}
      {showPlay && (
        <g transform={`translate(${W/2}, ${H/2 - 14})`}>
          <circle r="38" fill={palette.foil} opacity="0.16"/>
          <circle r="32" fill={palette.foil}/>
          <polygon points="-9,-13 16,0 -9,13" fill={palette.bg}/>
        </g>
      )}

      {/* Bottom gradient fade for legibility */}
      <rect y={H - 150} width={W} height="150" fill={`url(#fade-${id})`}/>

      {/* Top-right duration pill */}
      <g transform={`translate(${W - 20}, 22)`} textAnchor="end">
        <rect x="-128" y="-13" width="128" height="26" rx="3" fill={palette.bg2} fillOpacity="0.78" stroke={palette.foil} strokeWidth="0.6" strokeOpacity="0.7"/>
        <text x="-12" y="5" fill={palette.foil}
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.06em" }}>
          ▶ {durLabel}
        </text>
      </g>

      {/* Top-left category */}
      <g transform="translate(20, 36)">
        <text fill={palette.foil} opacity="0.85"
              style={{ fontFamily: "Source Serif 4, Georgia, serif", fontVariant: "small-caps", fontWeight: 600, fontSize: 11, letterSpacing: "0.22em" }}>
          {course.catLabel}
        </text>
      </g>

      {/* Title block — bottom */}
      <g transform={`translate(${W/2}, ${H - 78})`} textAnchor="middle">
        <text fill={palette.foil}
              style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 500, fontSize: 28, letterSpacing: "-0.01em" }}>
          {course.title}
        </text>
        <text y="32" fill={palette.foil} opacity="0.92"
              style={{ fontFamily: "Amiri, serif", fontSize: 20, fontWeight: 700, direction: "rtl" }}>
          {course.arabic}
        </text>
      </g>

      {/* Footer rule + meta */}
      <line x1="20" y1={H - 26} x2={W - 20} y2={H - 26} stroke={palette.foil} strokeWidth="0.4" opacity="0.4"/>
      <text x="20" y={H - 10} fill={palette.foil} opacity="0.7"
            style={{ fontFamily: "Source Serif 4, Georgia, serif", fontStyle: "italic", fontSize: 11 }}>
        Sheikh Abdulhakim
      </text>
      <text x={W - 20} y={H - 10} textAnchor="end" fill={palette.foil} opacity="0.7"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.08em" }}>
        {lessonsLabel}
      </text>

      {/* Subtle frame — keep the ornamental gold corners */}
      {[
        [12, 12, 0], [W - 12, 12, 90], [12, H - 12, -90], [W - 12, H - 12, 180],
      ].map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`} stroke={palette.foil} strokeWidth="0.7" fill="none" opacity="0.7">
          <path d="M 0 14 L 0 0 L 14 0"/>
          <circle cx="3" cy="3" r="1.2" fill={palette.foil}/>
        </g>
      ))}
    </svg>
  );
};

// CourseThumb — a small square poster used inline (e.g. stacked decks)
const BookSpine = ({ course, height = 240 }) => {
  return (
    <div style={{ width: height * 1.5, height, borderRadius: 4, overflow: "hidden", filter: "drop-shadow(2px 2px 6px rgba(40,24,12,0.32))" }}>
      <BookCover course={course} height="100%"/>
    </div>
  );
};

// Export to window for cross-script access
Object.assign(window, { Mark, Star8, Divider, Mihrab, Icon, BookCover, BookSpine, POSTER_PALETTES });
