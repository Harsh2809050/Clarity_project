import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://clarityproject.in'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Clarity Project — Conversations Shaping India\'s Future',
    template: '%s | Clarity Project',
  },
  description:
    'A weekly deep-dive with the architects, reformers, and builders rewriting education, policy, and entrepreneurship in India. Every conversation becomes a newsletter packed with ideas you can act on.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Clarity Project',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og-image.jpg'] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F5F1EC' },
    { media: '(prefers-color-scheme: dark)',  color: '#1A1917' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* Apply saved theme — light by default, only dark if user explicitly chose it */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){if(localStorage.getItem('cp-theme')==='dark')document.documentElement.classList.add('dark');})()`
        }} />
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}')` }} />
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'NewsMediaOrganization',
          name: 'Clarity Project',
          url: siteUrl,
          description: 'A weekly newsletter on education, policy, and entrepreneurship in India.',
        }) }} />
      </head>
      <body className="min-h-screen flex flex-col bg-parchment dark:bg-charcoal transition-colors duration-200">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
