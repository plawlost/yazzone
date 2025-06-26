import Link from 'next/link'
import { formatDate } from 'app/lib/format'

export function FeaturedEssays({ essays }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-2 rounded-lg inline-block">Essays</h2>
      <div className="space-y-3">
        {essays
          .sort((a, b) => {
            if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
              return -1
            }
            return 1
          })
          .slice(0, 3)
          .map((post) => (
          <div key={post.slug} className="flex items-baseline space-x-4">
            <span className="text-lg">•</span>
            <Link href={`/essays/${post.slug}`} className="text-lg underline decoration-1 underline-offset-2">
              {post.metadata.title}
            </Link>
            <span className="text-sm text-black/60 dark:text-white/60">
              {formatDate(post.metadata.publishedAt)}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-6">
          <Link href="/essays" className="inline-block border border-black dark:border-white text-black dark:text-white px-5 py-3 rounded-full text-lg font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10">
              View all essays →
          </Link>
      </div>
    </section>
  )
} 