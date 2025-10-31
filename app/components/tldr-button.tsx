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
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setSourceUrl(window.location.href)
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase()) || window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const prompt = title
    ? `The user wants a summary of the essay titled "${title}". Summarize it in direct, information-dense bullet points that capture every core argument, data point, and conclusion. Omit all filler and conversational fluff. After the summary, ask if they have any questions remaining, then provide a markdown link to go back to the original source: [Return to original article](${sourceUrl}).
------------------
"${title}"
${text}`
    : `The user was too lazy to read the following text. Summarize it in direct, information-dense bullet points that capture every core argument, data point, and conclusion. Omit all filler and conversational fluff. After the summary, ask if they have any questions remaining such then provide a markdown link to go back to the original source: [Return to original article](${sourceUrl}). Here is the text: ${text}`
  const encodedPrompt = encodeURIComponent(prompt)
  
  // Create URLs - use app deep links on mobile if available, fallback to web
  const chatGptWebUrl = `https://chatgpt.com/?m=${encodedPrompt}`
  const chatGptAppUrl = `chatgpt://?m=${encodedPrompt}`
  
  const claudeWebUrl = `https://claude.ai/new?q=${encodedPrompt}`
  const claudeAppUrl = `claude://new?q=${encodedPrompt}`
  
  const perplexityWebUrl = `https://www.perplexity.ai/search?q=${encodedPrompt}&focus=writing`
  const perplexityAppUrl = `perplexity://search?q=${encodedPrompt}&focus=writing`

  // Handle mobile app links with fallback
  const handleMobileLink = (appUrl: string, webUrl: string, e: React.MouseEvent) => {
    setIsOpen(false)
    if (isMobile) {
      e.preventDefault()
      // Try app deep link - if app is installed, it will open
      // Otherwise, fallback to web URL
      window.location.href = appUrl
      
      // Fallback to web after a brief delay if app doesn't open
      setTimeout(() => {
        // Only navigate if page is still visible (app didn't open)
        if (document.visibilityState === 'visible') {
          window.location.href = webUrl
        }
      }, 1500)
    }
    // On desktop, let the normal link behavior happen (target="_blank")
  }

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
              href={chatGptWebUrl}
              target={isMobile ? undefined : "_blank"}
              rel={isMobile ? undefined : "noopener noreferrer"}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={(e) => handleMobileLink(chatGptAppUrl, chatGptWebUrl, e)}
            >
              ChatGPT
            </a>
            <a
              href={claudeWebUrl}
              target={isMobile ? undefined : "_blank"}
              rel={isMobile ? undefined : "noopener noreferrer"}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={(e) => handleMobileLink(claudeAppUrl, claudeWebUrl, e)}
            >
              Claude
            </a>
            <a
              href={perplexityWebUrl}
              target={isMobile ? undefined : "_blank"}
              rel={isMobile ? undefined : "noopener noreferrer"}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
              onClick={(e) => handleMobileLink(perplexityAppUrl, perplexityWebUrl, e)}
            >
              Perplexity
            </a>
          </div>
        </div>
      )}
    </div>
  )
} 