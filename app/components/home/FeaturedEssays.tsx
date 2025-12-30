import Link from 'next/link'
import { formatDate } from 'app/lib/format'

export function FeaturedEssays({ essays }) {
  const sorted = essays
    .sort((a, b) => {
      if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
        return -1
      }
      return 1
    })
    .slice(0, 3)

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-bold">Essays</h2>
      <div className="space-y-4">
        {sorted.map((post) => (
          <div key={post.slug}>
            <Link
              href={`/essays/${post.slug}`}
              className="font-medium hover:underline underline-offset-2"
            >
              {post.metadata.title}
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              {formatDate(post.metadata.publishedAt, true)}
            </p>
          </div>
        ))}
      </div>
      <Link
        href="/essays"
        className="inline-block text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-4"
      >
        See All
      </Link>
    </section>
  )
}
