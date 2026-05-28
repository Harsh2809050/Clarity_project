import { ImageResponse } from 'next/og'
import { readFileSync, existsSync } from 'node:fs'
import path from 'node:path'
import { workIssues } from '@/data/work'

export const alt         = 'The Clarity Project'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Sun ray palette — matches ClarityLogo.tsx
const NAVY  = '#1B2D4F'
const AMBER = '#F5A725'
const RAYS: [number, string][] = [
  [  0, '#C74444'], [ 30, '#2B5BA0'], [ 60, '#D4A843'], [ 90, '#68B8C5'],
  [120, '#C74444'], [150, '#2B5BA0'], [180, '#D4A843'], [210, '#68B8C5'],
  [240, '#C74444'], [270, '#2B5BA0'], [300, '#D4A843'], [330, '#68B8C5'],
]
function pt(cx: number, cy: number, deg: number, r: number) {
  const rad = deg * Math.PI / 180
  return { x: +(cx + r * Math.sin(rad)).toFixed(2), y: +(cy - r * Math.cos(rad)).toFixed(2) }
}
// Small sun for top-left corner, centred at (52, 52)
const S = { cx: 52, cy: 52, rIn: 20, rOut: 44, rRing: 16, rCtr: 10 }
const sunRays = RAYS.map(([deg, color]) => ({
  a: pt(S.cx, S.cy, deg, S.rIn),
  b: pt(S.cx, S.cy, deg, S.rOut),
  color,
}))

type Props = { params: Promise<{ slug: string }> }

export default async function IssueOgImage({ params }: Props) {
  const { slug }  = await params
  const issue     = workIssues.find(i => i.id === slug)

  // ── Load thumbnail ───────────────────────────────────────────
  let thumbSrc: string | null = null
  if (issue?.thumbnail && !issue.thumbnail.startsWith('data:')) {
    const thumbPath = path.join(process.cwd(), 'public', issue.thumbnail)
    if (existsSync(thumbPath)) {
      const buf = readFileSync(thumbPath)
      const ext = issue.thumbnail.endsWith('.png') ? 'png' : 'jpeg'
      thumbSrc = `data:image/${ext};base64,${buf.toString('base64')}`
    }
  } else if (issue?.thumbnail?.startsWith('data:')) {
    thumbSrc = issue.thumbnail
  }

  const headline = issue
    ? (issue.headline.length > 72 ? issue.headline.slice(0, 69) + '…' : issue.headline)
    : 'The Clarity Project'

  const guestLine = issue ? `${issue.guest.name}  ·  ${issue.guest.title}` : ''
  const issueTag  = issue ? `ISSUE #${String(issue.issueNumber).padStart(2, '0')}  ·  ${issue.topic?.toUpperCase() ?? ''}` : ''

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          background: NAVY,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* ── Full-bleed thumbnail (right 60%) ─────────────────── */}
        {thumbSrc && (
          <img
            src={thumbSrc}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '660px',
              height: '630px',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        )}

        {/* ── Gradient: left solid → right fade so people are visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: thumbSrc
              ? `linear-gradient(to right, ${NAVY} 0%, ${NAVY} 42%, rgba(27,45,79,0.78) 62%, rgba(27,45,79,0.15) 100%)`
              : NAVY,
          }}
        />

        {/* ── Subtle bottom vignette for readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15,30,54,0.85) 0%, transparent 55%)',
          }}
        />

        {/* ── Content layer ────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '44px 52px',
          }}
        >
          {/* Top row: logo + issue tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* Clarity Project logomark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <svg viewBox="0 0 104 104" width="64" height="64">
                {sunRays.map((r, i) => (
                  <line key={i}
                    x1={r.a.x} y1={r.a.y} x2={r.b.x} y2={r.b.y}
                    stroke={r.color} strokeWidth="5" strokeLinecap="round"
                  />
                ))}
                <circle cx={S.cx} cy={S.cy} r={S.rRing} fill={NAVY} />
                <circle cx={S.cx} cy={S.cy} r={S.rCtr}  fill={AMBER} />
              </svg>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                <div style={{ color: 'rgba(245,241,236,0.6)', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 500, letterSpacing: '3px' }}>
                  THE
                </div>
                <div style={{ color: '#F5F1EC', fontFamily: 'sans-serif', fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1 }}>
                  Clarity
                </div>
                <div style={{ color: '#E05530', fontFamily: 'sans-serif', fontSize: 11, fontWeight: 700, letterSpacing: '3px' }}>
                  PROJECT
                </div>
              </div>
            </div>

            {/* Issue badge */}
            {issueTag && (
              <div style={{ display: 'flex', color: 'rgba(245,241,236,0.55)', fontFamily: 'sans-serif', fontSize: 13, fontWeight: 600, letterSpacing: '2px' }}>
                {issueTag}
              </div>
            )}
          </div>

          {/* Bottom: headline + guest */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '620px' }}>
            <div style={{ color: '#F5F1EC', fontFamily: 'sans-serif', fontSize: 38, fontWeight: 800, lineHeight: 1.18, letterSpacing: '-0.5px' }}>
              {headline}
            </div>
            {guestLine && (
              <div style={{ color: 'rgba(245,241,236,0.65)', fontFamily: 'sans-serif', fontSize: 17, fontWeight: 500 }}>
                {guestLine}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
