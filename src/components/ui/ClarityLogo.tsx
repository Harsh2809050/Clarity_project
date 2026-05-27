import Link from 'next/link'
import { cn } from '@/lib/utils'

// ── Brand palette ─────────────────────────────────────────
const NAVY   = '#1B2D4F'
const ORANGE = '#E05530'
const AMBER  = '#F5A725'

// 12 rays, clockwise from top — red · blue · gold · teal × 3
const RAYS: [number, string][] = [
  [  0, '#C74444'], [ 30, '#2B5BA0'], [ 60, '#D4A843'], [ 90, '#68B8C5'],
  [120, '#C74444'], [150, '#2B5BA0'], [180, '#D4A843'], [210, '#68B8C5'],
  [240, '#C74444'], [270, '#2B5BA0'], [300, '#D4A843'], [330, '#68B8C5'],
]

const R_IN = 15, R_OUT = 48   // ray radii — shorter so text has breathing room
const R_RING = 12, R_CENTER = 8

function pt(cx: number, cy: number, angleDeg: number, r: number) {
  const rad = angleDeg * (Math.PI / 180)
  return { x: +(cx + r * Math.sin(rad)).toFixed(2), y: +(cy - r * Math.cos(rad)).toFixed(2) }
}

// ── Reusable sun mark ─────────────────────────────────────
function Sun({ cx, cy }: { cx: number; cy: number }) {
  return (
    <>
      {RAYS.map(([angle, color], i) => {
        const a = pt(cx, cy, angle, R_IN)
        const b = pt(cx, cy, angle, R_OUT)
        return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
          stroke={color} strokeWidth="3.6" strokeLinecap="round" />
      })}
      <circle cx={cx} cy={cy} r={R_RING}   fill={NAVY} />
      <circle cx={cx} cy={cy} r={R_CENTER} fill={AMBER} />
    </>
  )
}

// ── Component ─────────────────────────────────────────────
interface ClarityLogoProps {
  variant?: 'icon' | 'stacked'
  size?: number
  asLink?: boolean
  className?: string
}

export function ClarityLogo({
  variant = 'stacked',
  size = 80,
  asLink = false,
  className,
}: ClarityLogoProps) {

  let svg: React.ReactNode

  if (variant === 'icon') {
    // Sun centred in 120 × 120
    svg = (
      <svg viewBox="0 0 120 120" width={size} height={size}
        role="img" aria-label="The Clarity Project"
        className={cn('shrink-0', className)}>
        <Sun cx={60} cy={60} />
      </svg>
    )
  } else {
    // Stacked: sun in top half, text below with guaranteed gap
    // Sun centre at y=54  → bottom ray tip = 54 + 48 = 102
    // "THE" baseline at y=118  → 16-unit clear gap ✓
    // "Clarity" baseline at y=145
    // "PROJECT" baseline at y=160
    // ViewBox height: 165
    const VH = 165
    const w = Math.round(size * (120 / VH))
    svg = (
      <svg viewBox={`0 0 120 ${VH}`} width={w} height={size}
        role="img" aria-label="The Clarity Project"
        className={cn(
          'shrink-0',
          'text-[#1B2D4F] dark:text-[#EDE8E2]',   // navy → cream in dark mode
          className,
        )}>
        <Sun cx={60} cy={54} />

        {/* THE — use style= so Safari honours letter-spacing & font-family */}
        <text x="60" y="118" textAnchor="middle" fill="currentColor"
          style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: '8.5px',
                   fontWeight: 500, letterSpacing: '3.5px' }}>THE</text>

        {/* Clarity */}
        <text x="60" y="145" textAnchor="middle" fill="currentColor"
          style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: '30px',
                   fontWeight: 800, letterSpacing: '-0.5px' }}>Clarity</text>

        {/* PROJECT */}
        <text x="60" y="160" textAnchor="middle" fill={ORANGE}
          style={{ fontFamily: 'Inter,system-ui,sans-serif', fontSize: '9px',
                   fontWeight: 600, letterSpacing: '3.5px' }}>PROJECT</text>
      </svg>
    )
  }

  if (asLink) {
    return <Link href="/" aria-label="The Clarity Project — Home">{svg}</Link>
  }
  return <>{svg}</>
}
