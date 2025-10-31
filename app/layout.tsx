import './global.css'
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { baseUrl } from './sitemap'
import { CookieNotice } from 'app/components/CookieNotice'
import { ThemeProvider } from 'app/components/theme-provider'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Yaz Caleb',
    template: '%s | Yaz Caleb',
  },
  description: 'Founder, Thinker, Nonconformist.',
  openGraph: {
    title: 'Yaz Caleb',
    description: 'Founder, Thinker, Nonconformist.',
    url: baseUrl,
    siteName: 'Yaz Caleb',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/og`,
        width: 1200,
        height: 630,
        alt: 'Yaz Caleb',
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
  keywords: ['Yaz Caleb', 'Yagiz Erkam Çelebi', 'Yağız Erkam Çelebi', 'plawlost', 'founder', 'thinker', 'nonconformist', 'agent-native', 'AI', 'iconoclastic essays', 'PlawLabs', 'VulnZap', 'LLMStreet', 'Brief'],
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Lora:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased max-w-6xl mx-auto sm:px-8 mt-12">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex-auto min-w-0 mt-8 flex flex-col px-2 sm:px-4 md:px-8">
            {children}
            <Analytics />
            <SpeedInsights />
            <CookieNotice />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
