import Link from 'next/link'
import { getEssays } from './utils'
import { formatDate } from 'app/lib/format'

export default function EssaysPage() {
  const allEssays = getEssays()
    .sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
          return -1
        }
        return 1
      })

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
      >
        ← Return to homepage
      </Link>
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Essays</h1>
        <p className="text-lg sm:text-xl text-black/80 dark:text-white/80 max-w-2xl">
          All my raw takes about leverage, entropy, and the few things worth betting your life on.
        </p>
        <a
          href="/feed.xml"
          className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
        >
          Subscribe via RSS
        </a>
      </header>

      <div className="border-t border-black/10 dark:border-white/10">
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {allEssays.map((post) => (
            <Link
              key={post.slug}
              href={`/essays/${post.slug}`}
              className="block py-8 group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold group-hover:underline decoration-1 underline-offset-4 transition-all">
                    {post.metadata.title}
                  </h2>
                  <p className="text-black/80 dark:text-white/80 max-w-xl">
                    {post.metadata.summary}
                  </p>
                </div>
                <div className="text-sm text-black/60 dark:text-white/60 min-w-[140px] text-left sm:text-right">
                  <time dateTime={post.metadata.publishedAt}>
                    {formatDate(post.metadata.publishedAt)}
                  </time>
                  <span className="block">{post.metadata.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 