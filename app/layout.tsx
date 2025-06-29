import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'

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
    images: [
      {
        url: `${baseUrl}/og`,
        width: 1200,
        height: 630,
        alt: 'Yaz Celebi',
      },
    ],
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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased max-w-6xl mx-4 sm:mx-8 mt-12 lg:mx-auto">
          <main className="flex-auto min-w-0 mt-8 flex flex-col px-2 sm:px-4 md:px-8">
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
      </body>
    </html>
  )
}
