import RSS from 'rss';
import { getEssays } from 'app/essays/utils';
import { baseUrl } from 'app/sitemap';

export async function GET() {
  const allEssays = getEssays();

  const feed = new RSS({
    title: 'Yagiz E. Celebi | Essays',
    description: 'All my raw takes about leverage, entropy, and the few things worth betting your life on.',
    site_url: `${baseUrl}/essays`,
    feed_url: `${baseUrl}/feed.xml`,
    language: 'en',
    pubDate: new Date(),
    copyright: `© ${new Date().getFullYear()} Yagiz E. Celebi`,
  });

  allEssays.forEach((post) => {
    feed.item({
      title: post.metadata.title,
      description: post.metadata.summary,
      url: `${baseUrl}/essays/${post.slug}`,
      date: post.metadata.publishedAt,
      author: 'Yagiz E. Celebi',
    });
  });

  return new Response(feed.xml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
} 