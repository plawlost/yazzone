'use client'

import { useEffect, useRef, useState } from 'react'
import { TldrButton } from 'app/components/tldr-button'

export function HomepageClient({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [homepageText, setHomepageText] = useState('')

  useEffect(() => {
    if (contentRef.current) {
      setHomepageText(contentRef.current.innerText)
    }
  }, [])

  return (
    <div className="md:col-span-2 space-y-12 md:space-y-16" ref={contentRef}>
      {children}
      <TldrButton text={homepageText} isFloating={true} />
    </div>
  )
}
