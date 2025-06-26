'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { formatDate } from 'app/lib/format'
import Image from 'next/image'

type Essay = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    imageAlt?: string;
    readingTime: string;
    featured?: boolean;
  };
  slug: string;
  content: string;
}

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc' | 'reading-asc' | 'reading-desc'

function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/#+\s/g, '') // Headers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // Bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // Italics
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/<a\b[^>]*>(.*?)<\/a>/gi, '$1') // HTML links
    .replace(/!\[(.*?)\]\(.*?\)/g, '') // Images
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1') // Code
    .replace(/>\s/g, '') // Blockquotes
    .replace(/-\s/g, '') // List items
    .replace(/\n/g, ' '); // Newlines
}

function truncateContent(content: string, wordLimit: number = 25): string {
    const plainText = stripMarkdown(content);
    const words = plainText.split(/\s+/);
    if (words.length <= wordLimit) {
        return plainText;
    }
    return words.slice(0, wordLimit).join(' ') + '...';
}

function sortEssays(essays: Essay[], sortBy: SortOption): Essay[] {
  return [...essays].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
      case 'date-asc':
        return new Date(a.metadata.publishedAt).getTime() - new Date(b.metadata.publishedAt).getTime()
      case 'title-asc':
        return a.metadata.title.localeCompare(b.metadata.title)
      case 'title-desc':
        return b.metadata.title.localeCompare(a.metadata.title)
      case 'reading-asc':
        return parseInt(a.metadata.readingTime) - parseInt(b.metadata.readingTime)
      case 'reading-desc':
        return parseInt(b.metadata.readingTime) - parseInt(a.metadata.readingTime)
      default:
        return 0
    }
  })
}

export default function EssayList({ essays }: { essays: Essay[] }) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  const [filteredEssays, setFilteredEssays] = useState(essays)

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase()
    let result = essays.filter((essay) => {
      return (
        essay.metadata.title.toLowerCase().includes(lowercasedSearch) ||
        essay.content.toLowerCase().includes(lowercasedSearch)
      )
    })
    
    result = sortEssays(result, sortBy)
    setFilteredEssays(result)
  }, [search, essays, sortBy])

  const sortOptions = [
    { value: 'date-desc', label: 'Newest first' },
    { value: 'date-asc', label: 'Oldest first' },
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'reading-asc', label: 'Shortest read' },
    { value: 'reading-desc', label: 'Longest read' },
  ]

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-12 space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search essays by title or topic"
          className="w-full px-4 py-3 text-base border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-black"
        />
        
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3 py-1.5 text-sm border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 bg-white dark:bg-black w-full sm:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-800">
        {filteredEssays.length > 0 ? (
          filteredEssays.map((post) => (
            <article key={post.slug} className="border-b border-gray-200 dark:border-gray-800">
              <Link href={`/essays/${post.slug}`} className="block py-6 sm:py-8">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-grow space-y-2">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {post.metadata.title}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-sm text-gray-500 dark:text-gray-400 space-y-1 sm:space-y-0">
                      <span>{formatDate(post.metadata.publishedAt)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{post.metadata.readingTime}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed pt-1">
                      {truncateContent(post.content, 25)}
                    </p>
                  </div>
                  
                  {post.metadata.image && (
                    <div className="relative w-full h-32 sm:w-32 sm:h-20 flex-shrink-0 order-first sm:order-last">
                      <Image
                        src={post.metadata.image}
                        alt={post.metadata.imageAlt || 'Essay image'}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No essays found.</p>
          </div>
        )}
      </div>
    </div>
  )
} 