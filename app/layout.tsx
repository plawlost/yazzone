import './global.css'
import type { Metadata } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { CookieNotice } from 'app/components/CookieNotice'

const plex = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Yaz Celebi',
    template: '%s | Yaz Celebi',
  },
  description: 'Founder, Thinker, Nonconformist.',
  openGraph: {
    title: 'Yaz Celebi',
    description: 'Founder, Thinker, Nonconformist.',
    url: baseUrl,
    siteName: 'Yaz Celebi',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
  keywords: ['Yaz Celebi', 'founder', 'thinker', 'nonconformist', 'agent-native', 'AI', 'iconoclastic essays', 'PlawLabs', 'VulnZap', 'LLMStreet', 'Brief'],
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white',
        plex.className
      )}
    >
      <body className="antialiased max-w-6xl mx-4 sm:mx-8 mt-12 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-8 flex flex-col px-2 sm:px-4 md:px-8">
          {children}
          <Analytics />
          <SpeedInsights />
          <CookieNotice />
        </main>
      </body>
    </html>
  )
}
