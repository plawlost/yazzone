import Link from 'next/link'
import { getEssays } from './utils'
import { formatDate } from '../lib/format'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Essays',
  description: 'Essays by Yaz Caleb on leverage, systems, and building things that matter.',
  openGraph: {
    title: 'Essays | Yaz Caleb',
    description: 'Essays by Yaz Caleb on leverage, systems, and building things that matter.',
  },
}

export default function EssaysPage() {
  const essays = getEssays()
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })

  return (
    <div className="space-y-8 w-full max-w-2xl mx-auto">
      <header className="space-y-6">
        <Link
          href="/"
          className="inline-block text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          ← Back
        </Link>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Essays</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {essays.length} {essays.length === 1 ? 'essay' : 'essays'}
          </p>
        </div>
      </header>

      <div className="space-y-1 min-h-[60vh]">
        {essays.map((essay) => (
          <Link
            key={essay.slug}
            href={`/essays/${essay.slug}`}
            className="group block py-4 px-3 -mx-3 rounded-lg transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-zinc-900 dark:text-zinc-100 font-medium group-hover:underline underline-offset-4">
                {essay.metadata.title}
              </span>
              <span className="text-sm text-zinc-400 dark:text-zinc-500 shrink-0 tabular-nums">
                {formatDate(essay.metadata.publishedAt, true)}
              </span>
            </div>
            <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2">
              {essay.metadata.summary}
            </p>
          </Link>
        ))}
      </div>

      <footer className="pt-4 text-sm text-zinc-500 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800">
        <a
          href="/feed.xml"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          RSS Feed
        </a>
      </footer>
    </div>
  )
}
