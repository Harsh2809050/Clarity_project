import { ImageResponse } from 'next/og'

export const alt         = 'The Clarity Project'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand colours
const NAVY   = '#1B2D4F'
const ORANGE = '#E05530'
const AMBER  = '#F5A725'

// 12 rays — same palette as the real logo
const RAYS: [number, string][] = [
  [  0, '#C74444'], [ 30, '#2B5BA0'], [ 60, '#D4A843'], [ 90, '#68B8C5'],
  [120, '#C74444'], [150, '#2B5BA0'], [180, '#D4A843'], [210, '#68B8C5'],
  [240, '#C74444'], [270, '#2B5BA0'], [300, '#D4A843'], [330, '#68B8C5'],
]

function pt(cx: number, cy: number, deg: number, r: number) {
  const rad = deg * Math.PI / 180
  return { x: +(cx + r * Math.sin(rad)).toFixed(2), y: +(cy - r * Math.cos(rad)).toFixed(2) }
}

// Sun centred at (600, 245) in 1200×630 canvas
const CX = 600, CY = 245
const R_IN = 56, R_OUT = 184, R_RING = 44, R_CENTER = 29
const rays = RAYS.map(([deg, color]) => ({
  a: pt(CX, CY, deg, R_IN), b: pt(CX, CY, deg, R_OUT), color,
}))

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '1200px',
          height: '630px',
          // Clean white/cream background — no dark card
          background: '#FAFAF8',
          gap: 0,
        }}
      >
        {/* Sun — SVG graphical elements only (Satori doesn't support <text>) */}
        <svg viewBox="0 0 1200 630" width="1200" height="630"
          style={{ position: 'absolute', top: 0, left: 0 }}>
          {rays.map((r, i) => (
            <line key={i}
              x1={r.a.x} y1={r.a.y} x2={r.b.x} y2={r.b.y}
              stroke={r.color} strokeWidth="14" strokeLinecap="round"
            />
          ))}
          <circle cx={CX} cy={CY} r={R_RING}   fill="#FAFAF8" />
          <circle cx={CX} cy={CY} r={R_CENTER} fill={AMBER} />
        </svg>

        {/* Wordmark — HTML divs (no SVG text) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* Spacer to push wordmark below sun */}
          <div style={{ height: '420px', display: 'flex' }} />

          <div style={{ display: 'flex', color: NAVY, fontFamily: 'sans-serif',
            fontSize: 22, fontWeight: 500, letterSpacing: '12px', opacity: 0.7 }}>
            THE
          </div>

          <div style={{ display: 'flex', color: NAVY, fontFamily: 'sans-serif',
            fontSize: 108, fontWeight: 800, letterSpacing: '-3px', lineHeight: 1,
            marginTop: '2px' }}>
            Clarity
          </div>

          <div style={{ display: 'flex', color: ORANGE, fontFamily: 'sans-serif',
            fontSize: 22, fontWeight: 700, letterSpacing: '12px', marginTop: '4px' }}>
            PROJECT
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
