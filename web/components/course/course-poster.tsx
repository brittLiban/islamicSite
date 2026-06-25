import type { CourseData } from '@/lib/data'

const PALETTES = {
  forest: { bg: '#1F3D2E', bg2: '#143024', foil: '#DCB65E', text: '#F5EDD8' },
  clay:   { bg: '#7E4D2A', bg2: '#5A381F', foil: '#F0DAA0', text: '#FBF1DA' },
  umber:  { bg: '#3D2A1F', bg2: '#241712', foil: '#DCB65E', text: '#F5EDD8' },
  gold:   { bg: '#7E6724', bg2: '#5A4818', foil: '#FBF1DA', text: '#FBF1DA' },
  slate:  { bg: '#475D70', bg2: '#2F3F4F', foil: '#DCB65E', text: '#F5EDD8' },
}

export function CoursePoster({ course, height = '100%', showPlay = true }: {
  course: CourseData
  height?: string | number
  showPlay?: boolean
}) {
  const palette = PALETTES[course.coverColor] ?? PALETTES.forest
  const id = course.id
  const W = 480, H = 320
  const lessonsLabel = course.lessons ? `${course.lessons} lessons` : 'Video series'
  const durLabel = course.duration ?? ''

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      style={{
        width: '100%',
        height,
        display: 'block',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        filter: 'drop-shadow(0 12px 24px rgba(40,24,12,0.28))',
      }}
      aria-label={course.title}
    >
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.bg} />
          <stop offset="1" stopColor={palette.bg2} />
        </linearGradient>
        <linearGradient id={`fade-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={palette.bg2} stopOpacity="0" />
          <stop offset="0.4" stopColor={palette.bg2} stopOpacity="0.4" />
          <stop offset="1" stopColor={palette.bg2} stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id={`spot-${id}`} cx="0.5" cy="0.42" r="0.55">
          <stop offset="0" stopColor={palette.foil} stopOpacity="0.18" />
          <stop offset="1" stopColor={palette.foil} stopOpacity="0" />
        </radialGradient>
        <filter id={`grain-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={String(id).length} />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.11 0" />
        </filter>
      </defs>

      <rect width={W} height={H} fill={`url(#bg-${id})`} />
      <rect width={W} height={H} fill={`url(#spot-${id})`} />

      {/* Tile pattern — faint 8-point stars */}
      <g stroke={palette.foil} strokeWidth="0.5" fill="none" opacity="0.10">
        {Array.from({ length: 9 }, (_, i) =>
          Array.from({ length: 5 }, (_, j) => (
            <g key={`${i}-${j}`} transform={`translate(${30 + i * 56},${30 + j * 56 + (i % 2) * 28})`}>
              <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" />
              <polygon points="0,-10 3,-3 10,0 3,3 0,10 -3,3 -10,0 -3,-3" transform="rotate(45)" />
            </g>
          ))
        )}
      </g>

      <rect width={W} height={H} filter={`url(#grain-${id})`} opacity="0.7" />

      {/* Mihrab arch frame */}
      <g stroke={palette.foil} fill="none" opacity="0.85">
        <path
          d={`M ${W / 2 - 90} ${H + 20} L ${W / 2 - 90} ${H / 2 + 10} Q ${W / 2 - 90} ${H / 2 - 60} ${W / 2} ${H / 2 - 88} Q ${W / 2 + 90} ${H / 2 - 60} ${W / 2 + 90} ${H / 2 + 10} L ${W / 2 + 90} ${H + 20}`}
          strokeWidth="1.3"
        />
        <path
          d={`M ${W / 2 - 78} ${H + 20} L ${W / 2 - 78} ${H / 2 + 10} Q ${W / 2 - 78} ${H / 2 - 48} ${W / 2} ${H / 2 - 76} Q ${W / 2 + 78} ${H / 2 - 48} ${W / 2 + 78} ${H / 2 + 10} L ${W / 2 + 78} ${H + 20}`}
          strokeWidth="0.5" opacity="0.6"
        />
      </g>

      {/* Play button */}
      {showPlay && (
        <g transform={`translate(${W / 2}, ${H / 2 - 14})`}>
          <circle r="38" fill={palette.foil} opacity="0.16" />
          <circle r="32" fill={palette.foil} />
          <polygon points="-9,-13 16,0 -9,13" fill={palette.bg} />
        </g>
      )}

      <rect y={H - 150} width={W} height="150" fill={`url(#fade-${id})`} />

      {/* Duration pill */}
      <g transform={`translate(${W - 20}, 22)`} textAnchor="end">
        <rect x="-128" y="-13" width="128" height="26" rx="3"
          fill={palette.bg2} fillOpacity="0.78" stroke={palette.foil} strokeWidth="0.6" strokeOpacity="0.7" />
        <text x="-12" y="5" fill={palette.foil}
          style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, letterSpacing: '0.06em' }}>
          ▶ {durLabel}
        </text>
      </g>

      {/* Category eyebrow */}
      <g transform="translate(20, 36)">
        <text fill={palette.foil} opacity="0.85"
          style={{ fontFamily: 'Source Serif 4, Georgia, serif', fontVariant: 'small-caps', fontWeight: 600, fontSize: 11, letterSpacing: '0.22em' }}>
          {course.catLabel}
        </text>
      </g>

      {/* Title block */}
      <g transform={`translate(${W / 2}, ${H - 78})`} textAnchor="middle">
        <text fill={palette.foil}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500, fontSize: 28, letterSpacing: '-0.01em' }}>
          {course.title}
        </text>
        <text y="32" fill={palette.foil} opacity="0.92"
          style={{ fontFamily: 'Amiri, serif', fontSize: 20, fontWeight: 700, direction: 'rtl' }}>
          {course.arabic}
        </text>
      </g>

      {/* Footer */}
      <line x1="20" y1={H - 26} x2={W - 20} y2={H - 26} stroke={palette.foil} strokeWidth="0.4" opacity="0.4" />
      <text x="20" y={H - 10} fill={palette.foil} opacity="0.7"
        style={{ fontFamily: 'Source Serif 4, Georgia, serif', fontStyle: 'italic', fontSize: 11 }}>
        Sheikh Abdulhakim
      </text>
      <text x={W - 20} y={H - 10} textAnchor="end" fill={palette.foil} opacity="0.7"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em' }}>
        {lessonsLabel}
      </text>

      {/* Corner ornaments */}
      {([[12, 12, 0], [W - 12, 12, 90], [12, H - 12, -90], [W - 12, H - 12, 180]] as const).map(([x, y, rot], i) => (
        <g key={i} transform={`translate(${x},${y}) rotate(${rot})`}
          stroke={palette.foil} strokeWidth="0.7" fill="none" opacity="0.7">
          <path d="M 0 14 L 0 0 L 14 0" />
          <circle cx="3" cy="3" r="1.2" fill={palette.foil} />
        </g>
      ))}
    </svg>
  )
}
