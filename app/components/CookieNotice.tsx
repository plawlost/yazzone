'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CookieNotice() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShow(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setShow(false)
  }

  if (!show) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-50 p-4 bg-white/80 backdrop-blur-md rounded-lg shadow-lg max-w-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <p className="text-sm text-black/80">
          This site uses cookies to enhance your experience. The{' '}
          <Link href="https://github.com/plawlost/yazzone" target="_blank" rel="noopener noreferrer" className="underline">
            code is open source
          </Link>.
        </p>
        <button
          onClick={handleAccept}
          className="bg-black text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-black/80 transition-colors flex-shrink-0"
        >
          Got it!
        </button>
      </div>
    </div>
  )
} 