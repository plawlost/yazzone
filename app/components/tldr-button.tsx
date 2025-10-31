'use client'

import React, { useState, useRef, useEffect } from 'react'

interface TldrButtonProps {
  text: string
  className?: string
  isFloating?: boolean
  title?: string
}

export function TldrButton({
  text,
  className,
  isFloating = false,
  title,
}: TldrButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [sourceUrl, setSourceUrl] = useState('')

  useEffect(() => {
    setSourceUrl(window.location.href)
  }, [])

  const prompt = title
    ? `The user wants a summary of the essay titled "${title}". Summarize it in direct, information-dense bullet points that capture every core argument, data point, and conclusion. Omit all filler and conversational fluff. After the summary, ask if they have any questions remaining, then provide a markdown link to go back to the original source: [Return to original article](${sourceUrl}).
------------------
"${title}"
${text}`
    : `The user was too lazy to read the following text. Summarize it in direct, information-dense bullet points that capture every core argument, data point, and conclusion. Omit all filler and conversational fluff. After the summary, ask if they have any questions remaining such then provide a markdown link to go back to the original source: [Return to original article](${sourceUrl}). Here is the text: ${text}`
  const encodedPrompt = encodeURIComponent(prompt)
  const chatGptUrl = `https://chatgpt.com/?m=${encodedPrompt}`
  const claudeUrl = `https://claude.ai/new?q=${encodedPrompt}`
  const perplexityUrl = `https://www.perplexity.ai/search?q=${encodedPrompt}&focus=writing`

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const containerClass = isFloating 
    ? "fixed bottom-6 right-6 z-40"
    : `relative ${className}`

  const buttonClass = isFloating 
    ? "bg-white/80 dark:bg-black/80 backdrop-blur-sm border border-black/10 dark:border-white/10 px-4 py-2 rounded-full shadow-sm text-base underline decoration-1 underline-offset-2 text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors"
    : "text-sm underline decoration-1 underline-offset-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"

  return (
    <div className={containerClass} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonClass}
        title="Summarize with AI"
      >
        TL;DR, brief with AI
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-2 z-10 w-52 sm:w-56 origin-bottom-right rounded-md bg-white dark:bg-black shadow-lg ring-1 ring-black dark:ring-white ring-opacity-5 dark:ring-opacity-10 focus:outline-none">
          <div className="py-1">
            <a
              href={chatGptUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              ChatGPT
            </a>
            <a
              href={claudeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Claude
            </a>
            <a
              href={perplexityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Perplexity
            </a>
          </div>
        </div>
      )}
    </div>
  )
} 