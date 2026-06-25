export function Divider({ color = 'var(--gold-3)' }: { color?: string }) {
  return (
    <svg
      width="320" height="24" viewBox="0 0 320 24" fill="none"
      aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}
    >
      <g stroke={color} strokeWidth="0.8" fill="none">
        <line x1="0" y1="12" x2="124" y2="12" />
        <line x1="196" y1="12" x2="320" y2="12" />
      </g>
      <g transform="translate(160,12)" fill={color}>
        <polygon points="0,-9 2.6,-2.6 9,0 2.6,2.6 0,9 -2.6,2.6 -9,0 -2.6,-2.6" fill="none" stroke={color} strokeWidth="0.9" />
        <polygon points="0,-9 2.6,-2.6 9,0 2.6,2.6 0,9 -2.6,2.6 -9,0 -2.6,-2.6" transform="rotate(45)" fill="none" stroke={color} strokeWidth="0.9" />
        <circle r="1.4" />
        <circle r="0.9" cx="-22" />
        <circle r="0.9" cx="22" />
        <circle r="0.6" cx="-36" />
        <circle r="0.6" cx="36" />
      </g>
    </svg>
  )
}
