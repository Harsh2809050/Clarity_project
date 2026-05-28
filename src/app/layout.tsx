import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ConditionalLayout } from '@/components/layout/ConditionalLayout'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: ['600', '700', '800'],   // only weights actually used for headings
})

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
  },
  twitter: { card: 'summary_large_image' },
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
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <head>
        {/* Preconnect to speed up Google Fonts + image CDNs */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://cdn.beehiiv.com" />

        {/* Apply saved theme — light by default, only dark if user explicitly chose it */}
        <script dangerouslySetInnerHTML={{
          __html: `(function(){try{if(localStorage.getItem('cp-theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})()`
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
      <body className="min-h-dvh flex flex-col bg-parchment dark:bg-charcoal">
        <ThemeProvider>
          <ConditionalLayout>{children}</ConditionalLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
