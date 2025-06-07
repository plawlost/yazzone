import { getEssays } from 'app/essays/utils'

export const baseUrl = 'https://yaz.zone'

export default async function sitemap() {
  let essays = getEssays().map((post) => ({
    url: `${baseUrl}/essays/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt).toISOString().split('T')[0],
  }))

  let routes = ['', '/essays'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...essays]
}
