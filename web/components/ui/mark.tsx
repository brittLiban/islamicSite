export function Mark({ size = 38 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="60" height="60" rx="3" fill="var(--forest)" />
      <rect x="4.5" y="4.5" width="55" height="55" rx="2" fill="none" stroke="var(--gold)" strokeWidth="0.6" />
      <path
        d="M 16 52 L 16 32 Q 16 16 32 12 Q 48 16 48 32 L 48 52 Z"
        fill="none" stroke="var(--gold-2)" strokeWidth="1.6" strokeLinejoin="round"
      />
      <path d="M 22 32 Q 22 22 32 18 Q 42 22 42 32" fill="none" stroke="var(--gold-2)" strokeWidth="0.8" />
      <g transform="translate(32,34)" fill="var(--gold-2)">
        <polygon points="0,-6 1.7,-1.7 6,0 1.7,1.7 0,6 -1.7,1.7 -6,0 -1.7,-1.7" />
        <polygon points="0,-6 1.7,-1.7 6,0 1.7,1.7 0,6 -1.7,1.7 -6,0 -1.7,-1.7" transform="rotate(45)" />
      </g>
      <line x1="14" y1="54" x2="50" y2="54" stroke="var(--gold)" strokeWidth="0.5" />
    </svg>
  )
}
