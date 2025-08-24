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

  const featuredEssay = allEssays.find(essay => essay.slug === 'two-steps-one-test') || allEssays.find(essay => essay.metadata.featured)
  const regularEssays = allEssays.filter(essay => essay.slug !== 'two-steps-one-test' && !essay.metadata.featured)

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
      >
        ← Return to homepage
      </Link>
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Essays</h1>
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

      {featuredEssay && (
        <section className="space-y-6">
          <div className="text-sm text-black/60 dark:text-white/60 uppercase tracking-wider">
            Featured Essay
          </div>
          <Link
            href={`/essays/${featuredEssay.slug}`}
            className="block group"
          >
            <div className="p-8 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
                <div className="space-y-3">
                  <h2 className="text-3xl font-bold group-hover:underline decoration-2 underline-offset-4 transition-all">
                    {featuredEssay.metadata.title}
                  </h2>
                  <p className="text-black/80 dark:text-white/80 max-w-2xl text-lg leading-relaxed">
                    {featuredEssay.metadata.summary}
                  </p>
                </div>
                <div className="text-sm text-black/60 dark:text-white/60 min-w-[140px] text-left sm:text-right">
                  <time dateTime={featuredEssay.metadata.publishedAt}>
                    {formatDate(featuredEssay.metadata.publishedAt)}
                  </time>
                  <span className="block">{featuredEssay.metadata.readingTime}</span>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}
      <div className="border-t border-black/10 dark:border-white/10">
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {regularEssays.map((post) => (
            <Link
              key={post.slug}
              href={`/essays/${post.slug}`}
              className="block py-8 group"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold group-hover:underline decoration-2 underline-offset-4 transition-all">
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