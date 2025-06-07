import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CustomMDX } from 'app/components/mdx'
import { getEssays, getEssay, Metadata } from 'app/essays/utils'
import { formatDate } from 'app/lib/format'
import { baseUrl } from 'app/sitemap'
import { TldrButton } from 'app/components/tldr-button'

export async function generateStaticParams() {
  let posts = getEssays()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post: {
    metadata: Metadata;
    slug: string;
    content: string;
  } | undefined = getEssays().find((post) => post.slug === params.slug);

  if (!post) {
    return null
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/essays/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default function Blog({ params }: { params: { slug: string } }) {
  let post = getEssay(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <section className="max-w-4xl mx-auto">
      <Link
        href="/essays"
        className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black transition-colors mb-8 block"
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
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/essays/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'My Portfolio',
            },
          }),
        }}
      />
      <div className="flex flex-col-reverse sm:flex-row justify-between items-start mb-4 space-y-4 sm:space-y-0">
        <h1 className="title font-bold text-3xl sm:text-4xl tracking-tighter">
          {post.metadata.title}
        </h1>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {post.metadata.readingTime}
        </p>
      </div>
      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
        <CustomMDX source={post.content} />
      </article>
      
      <TldrButton text={post.content} isFloating={true} />
    </section>
  )
}
