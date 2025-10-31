import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CustomMDX } from 'app/components/mdx'
import { getEssays, getEssay, Metadata } from 'app/essays/utils'
import { formatDate } from 'app/lib/format'
import { baseUrl } from 'app/sitemap'
import { WikipediaLink } from 'app/essays/WikipediaLink'
import { ThemeToggle } from 'app/components/ThemeToggle'
import { TldrButton } from 'app/components/tldr-button'

export async function generateStaticParams() {
  let posts = getEssays()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post = getEssays().find((post) => post.slug === params.slug);

  if (!post) {
    return null
  }

  let {
    title,
    publishedAt: publishedTime,
    summary,
    ogImage,
  } = post.metadata
  let finalOgImage = ogImage
    ? ogImage
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/essays/${post.slug}`,
      images: [
        {
          url: finalOgImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
      images: [finalOgImage],
    },
  }
}

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getEssay(params.slug)
  const allEssays = getEssays()
  const readNext = allEssays
    .filter((e) => e.slug !== params.slug)
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 2)

  if (!post) {
    notFound()
  }

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-[65ch] flex items-center justify-between mb-6">
        <Link
          href="/essays"
          className="text-sm underline decoration-1 underline-offset-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          ← Return to all essays
        </Link>
        <div className="shrink-0">
          {/* Theme toggle on essay pages */}
          <ThemeToggle />
        </div>
      </div>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.ogImage
              ? post.metadata.ogImage
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/essays/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <header className="mx-auto max-w-[65ch] mb-8 text-left">
        <h1 className="title font-bold text-4xl sm:text-5xl tracking-tight mb-6 text-black dark:text-white">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          <time dateTime={post.metadata.publishedAt}>
            {formatDate(post.metadata.publishedAt)}
          </time>
          <span>•</span>
          <span>{post.metadata.readingTime}</span>
        </div>
        {post.metadata.image && (
          <div className="mb-8 relative">
            <Image
              src={post.metadata.image}
              alt={post.metadata.title}
              width={1280}
              height={720}
              className="w-full h-auto rounded-md shadow-sm"
              priority
            />
          </div>
        )}
      </header>
      <article className="prose prose-lg dark:prose-invert">
        <CustomMDX source={post.content} components={{ WikipediaLink }}/>
      </article>

      <TldrButton text={post.content} title={post.metadata.title} isFloating={true} />

      <footer className="mx-auto max-w-[65ch] mt-16 border-t border-black/10 dark:border-white/10 pt-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-3">Read next</h3>
            <ul className="space-y-2">
              {readNext.map((e) => (
                <li key={e.slug}>
                  <Link href={`/essays/${e.slug}`} className="underline decoration-1 underline-offset-2">
                    {e.metadata.title}
                  </Link>
                  <span className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">{formatDate(e.metadata.publishedAt)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400 mb-3">About the author</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Yaz builds what Silicon Valley forgot. He is a 16-year-old founder of Plaw Inc, shipping agent-native tools like VulnZap and writing sharp, contrarian essays.
            </p>
          </div>
        </div>
      </footer>
    </section>
  )
}
