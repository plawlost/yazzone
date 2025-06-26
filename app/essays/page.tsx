import Link from 'next/link'
import { getEssays } from './utils'
import EssayList from '../components/EssayList'

export default function EssaysPage() {
  const allEssays = getEssays()
    .sort((a, b) => {
        if (new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)) {
          return -1
        }
        return 1
      })

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <Link
        href="/"
        className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
      >
        ← Return to homepage
      </Link>
      <header className="space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter">Essays</h1>
        <p className="text-lg sm:text-xl text-black/80 dark:text-white/80 max-w-2xl">
          All my raw takes about leverage, entropy, and the few things worth betting your life on.
        </p>
        <a 
          href="/feed.xml" 
          className="text-sm underline decoration-1 underline-offset-2 text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
        >
          Subscribe via RSS
        </a>
      </header>
      <div className="border-t border-black/10">
        <EssayList essays={allEssays} />
      </div>
    </div>
  )
} 