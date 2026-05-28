import { ImageResponse } from 'next/og'

export const alt         = 'The Clarity Project'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

const NAVY   = '#1B2D4F'
const ORANGE = '#E05530'
const AMBER  = '#F5A725'
const CREAM  = '#F5F1EC'

// 12 rays — same palette as ClarityLogo.tsx
const RAYS: [number, string][] = [
  [  0, '#C74444'], [ 30, '#2B5BA0'], [ 60, '#D4A843'], [ 90, '#68B8C5'],
  [120, '#C74444'], [150, '#2B5BA0'], [180, '#D4A843'], [210, '#68B8C5'],
  [240, '#C74444'], [270, '#2B5BA0'], [300, '#D4A843'], [330, '#68B8C5'],
]

function pt(cx: number, cy: number, deg: number, r: number) {
  const rad = deg * Math.PI / 180
  return { x: +(cx + r * Math.sin(rad)).toFixed(2), y: +(cy - r * Math.cos(rad)).toFixed(2) }
}

// Ray endpoints for a 240×240 viewBox, sun centred at (120,120)
const CX = 120, CY = 120, R_IN = 38, R_OUT = 110, R_RING = 30, R_CENTER = 20
const rays = RAYS.map(([deg, color]) => ({
  a: pt(CX, CY, deg, R_IN),
  b: pt(CX, CY, deg, R_OUT),
  color,
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
          background: `linear-gradient(145deg, ${NAVY} 0%, #0F1E36 100%)`,
          gap: '0px',
        }}
      >
        {/* Sun — SVG with only line + circle (no <text>) */}
        <svg viewBox="0 0 240 240" width="240" height="240">
          {rays.map((r, i) => (
            <line key={i}
              x1={r.a.x} y1={r.a.y} x2={r.b.x} y2={r.b.y}
              stroke={r.color} strokeWidth="9" strokeLinecap="round"
            />
          ))}
          <circle cx={CX} cy={CY} r={R_RING}   fill={NAVY} />
          <circle cx={CX} cy={CY} r={R_CENTER} fill={AMBER} />
        </svg>

        {/* THE */}
        <div style={{
          display: 'flex',
          color: 'rgba(245,241,236,0.7)',
          fontFamily: 'sans-serif',
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: '10px',
          marginTop: '4px',
        }}>THE</div>

        {/* Clarity */}
        <div style={{
          display: 'flex',
          color: CREAM,
          fontFamily: 'sans-serif',
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1,
          marginTop: '2px',
        }}>Clarity</div>

        {/* PROJECT */}
        <div style={{
          display: 'flex',
          color: ORANGE,
          fontFamily: 'sans-serif',
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '10px',
          marginTop: '4px',
        }}>PROJECT</div>

        {/* Divider */}
        <div style={{
          display: 'flex',
          width: '48px',
          height: '3px',
          background: ORANGE,
          borderRadius: '9999px',
          margin: '24px 0 18px',
        }} />

        {/* Tagline */}
        <div style={{
          display: 'flex',
          color: 'rgba(245,241,236,0.55)',
          fontFamily: 'sans-serif',
          fontSize: 20,
          fontWeight: 400,
          textAlign: 'center',
          maxWidth: '520px',
          lineHeight: 1.55,
        }}>
          Real conversations with the architects, reformers, and builders reshaping India.
        </div>
      </div>
    ),
    { ...size },
  )
}
