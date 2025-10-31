import Link from 'next/link'
import { formatDate } from 'app/lib/format'

export function FeaturedEssays({ essays }) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Essays</h2>
      <div className="space-y-4">
        {essays
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1
            }
            return 1
          })
          .slice(0, 3)
          .map((post) => (
            <div key={post.slug} className="flex items-start space-x-3">
              <span className="text-zinc-500 dark:text-zinc-400 pt-1">→</span>
              <div>
                <Link
                  href={`/essays/${post.slug}`}
                  className="font-medium hover:underline"
                >
                  {post.metadata.title}
                </Link>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="pt-2">
        <Link
          href="/essays"
          className="text-zinc-500 dark:text-zinc-400 hover:underline"
        >
          View all essays →
        </Link>
      </div>
    </section>
  )
} 