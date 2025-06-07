import React from 'react'

interface WikipediaLinkProps {
  keyword: string
  children: React.ReactNode
  className?: string
}

export function WikipediaLink({ keyword, children, className }: WikipediaLinkProps) {
  const WIKIPEDIA_BASE_URL = 'https://en.wikipedia.org/wiki/'
  const url = `${WIKIPEDIA_BASE_URL}${encodeURIComponent(keyword)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`underline decoration-dotted underline-offset-2 hover:text-black transition-colors ${className}`}
      title={`Read about ${keyword} on Wikipedia`}
    >
      {children}
    </a>
  )
} 