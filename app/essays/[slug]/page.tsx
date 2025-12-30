import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { getEssays, getEssay } from 'app/essays/utils'
import { formatDate } from 'app/lib/format'
import { baseUrl } from 'app/sitemap'
import { WikipediaLink } from 'app/essays/WikipediaLink'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  let posts = getEssays()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata | undefined {
  let post = getEssays().find((post) => post.slug === params.slug)

  if (!post) {
    return undefined
  }

  let {
    title,
    publishedAt: publishedTime,
    summary,
    ogImage,
  } = post.metadata
  let finalOgImage = ogImage
    ? ogImage
    : `${baseUrl}/yazzone-og.png`

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

// Static TL;DR dropdown component - CSS only, no JS
function TldrDropdown({ title, slug }: { title: string; slug: string }) {
  const pageUrl = `/essays/${slug}`
  const prompt = `Read this page and summarize it in crisp bullet points: https://yaz.zone${pageUrl}

Title: "${title}"

Be direct—every bullet should carry weight. Include key arguments, facts, and conclusions. Skip filler. After summarizing, ask if I have questions.`

  const encodedPrompt = encodeURIComponent(prompt)

  return (
    <details className="tldr-dropdown">
      <summary>TL;DR</summary>
      <div className="tldr-menu">
        <div className="py-1">
          <a
            href={`https://chatgpt.com/?m=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            ChatGPT
            <span className="text-xs text-zinc-400">↗</span>
          </a>
          <a
            href={`https://claude.ai/new?q=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            Claude
            <span className="text-xs text-zinc-400">↗</span>
          </a>
          <a
            href={`https://www.perplexity.ai/search?q=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            Perplexity
            <span className="text-xs text-zinc-400">↗</span>
          </a>
        </div>
        <div className="tldr-footer">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            AI will read &amp; summarize this page
          </p>
        </div>
      </div>
    </details>
  )
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
      <div className="mx-auto max-w-2xl flex items-center justify-between mb-6">
        <Link
          href="/essays"
          className="text-sm underline decoration-1 underline-offset-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          ← Return to all essays
        </Link>
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
              : `/yazzone-og.png`,
            url: `${baseUrl}/essays/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Yaz Caleb',
              url: 'https://yaz.zone',
              sameAs: ['https://x.com/yazcal'],
            },
          }),
        }}
      />
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-left">
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
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                width={1280}
                height={720}
                decoding="async"
                className="w-full h-auto rounded-md shadow-sm"
              />
            </div>
          )}
        </header>
        <article className="prose prose-lg dark:prose-invert">
        <CustomMDX source={post.content} components={{ WikipediaLink }}/>
      </article>

      <TldrDropdown title={post.metadata.title} slug={post.slug} />
      </div>

      <footer className="mx-auto max-w-2xl mt-20 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          — <Link href="/" className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors">Yaz</Link>
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {readNext.slice(0, 3).map((e) => (
            <Link 
              key={e.slug}
              href={`/essays/${e.slug}`} 
              className="text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              {e.metadata.title}
            </Link>
          ))}
        </nav>
      </footer>
    </section>
  )
}
