import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CustomMDX } from 'app/components/mdx'
import { getEssays, getEssay, Metadata } from 'app/essays/utils'
import { formatDate } from 'app/lib/format'
import { baseUrl } from 'app/sitemap'

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

  if (!post) {
    notFound()
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <Link
        href="/essays"
        className="text-sm underline decoration-1 underline-offset-2 text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white transition-colors mb-12 block"
      >
        ← Return to all essays
      </Link>
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
      <header className="mb-12">
        <h1 className="title font-bold text-4xl sm:text-5xl tracking-tight mb-6 text-black dark:text-white">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-8">
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
              className="w-full h-auto rounded-lg shadow-sm"
              priority
            />
          </div>
        )}
      </header>
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
    </section>
  )
}
