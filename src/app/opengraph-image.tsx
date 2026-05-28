import { ImageResponse } from 'next/og'
import { readFileSync } from 'node:fs'
import path from 'node:path'

export const alt         = 'The Clarity Project'
export const size        = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  const logoBuffer = readFileSync(path.join(process.cwd(), 'public/logo.png'))
  const logoSrc    = `data:image/png;base64,${logoBuffer.toString('base64')}`

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
          background: 'linear-gradient(140deg, #1B2D4F 0%, #0F1E36 100%)',
          padding: '80px',
          gap: '32px',
        }}
      >
        {/* Logo */}
        <img
          src={logoSrc}
          width={340}
          height={230}
          style={{ objectFit: 'contain' }}
        />

        {/* Divider */}
        <div style={{
          width: '48px',
          height: '3px',
          background: '#E05530',
          borderRadius: '999px',
        }} />

        {/* Tagline */}
        <p style={{
          color: 'rgba(245, 241, 236, 0.75)',
          fontSize: '22px',
          fontFamily: 'sans-serif',
          fontWeight: 400,
          textAlign: 'center',
          maxWidth: '560px',
          margin: 0,
          lineHeight: 1.55,
        }}>
          Real conversations with the architects, reformers, and builders reshaping India.
        </p>
      </div>
    ),
    { ...size }
  )
}
