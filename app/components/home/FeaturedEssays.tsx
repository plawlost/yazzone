import Link from 'next/link'
import { formatDate } from 'app/lib/format'

export function FeaturedEssays({ essays }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Essays</h2>
      <div className="space-y-4">
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
            <Link href={`/essays/${post.slug}`} className="text-lg underline decoration-1 underline-offset-2 hover:text-black/70 dark:hover:text-white/70 transition-colors">
              {post.metadata.title}
            </Link>
            <span className="text-sm text-black/60 dark:text-white/60 flex-shrink-0">
              {formatDate(post.metadata.publishedAt)}
            </span>
          </div>
        ))}
      </div>
      <div className="pt-2">
          <Link href="/essays" className="inline-block border border-black dark:border-white text-black dark:text-white px-5 py-3 rounded-full text-lg font-semibold transition-colors hover:bg-black/5 dark:hover:bg-white/10">
              View all essays →
          </Link>
      </div>
    </section>
  )
} 