import Link from 'next/link'
import Image from 'next/image'
import { getEssays, getHomepageData, getBackstoryData } from 'app/essays/utils'
import { ThemeToggle } from 'app/components/ThemeToggle'
import { Intro } from './components/home/Intro'
import { Backstory } from './components/home/Backstory'
import { FeaturedEssays } from './components/home/FeaturedEssays'
import { History } from './components/home/History'
import { Now } from './components/home/Now'
import { HomepageClient } from './components/home/HomepageClient'

export default function Page() {
  const allEssays = getEssays()
  const { now } = getHomepageData()
  const backstory = getBackstoryData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
      <div className="md:col-span-1 space-y-8 md:space-y-12">
        <header className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <Image
              src="/favicon.ico"
              alt="Yaz Caleb"
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Yaz A. Caleb.
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4">
              <a href="#history" className="text-zinc-500 dark:text-zinc-400 hover:underline">History</a>
              <a href="#now" className="text-zinc-500 dark:text-zinc-400 hover:underline">Now</a>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <div className="hidden md:block space-y-4">
          <div className="space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="mailto:yaz@plawlabs.com" className="block hover:underline">
              yaz@plawlabs.com
            </a>
            <a href="tel:+16283034902" className="block hover:underline">
              +1 (628) 303-4902
            </a>
          </div>
        </div>

        <div className="hidden md:block space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="https://x.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            X <span className="text-xs text-zinc-400 dark:text-zinc-500">(preferred)</span>
          </a>
          <a
            href="https://instagram.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            Instagram <span className="text-xs text-zinc-400 dark:text-zinc-500">(rare)</span>
          </a>
          <a
            href="https://github.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            GitHub <span className="text-xs text-zinc-400 dark:text-zinc-500">(shipping daily)</span>
          </a>
        </div>
      </div>

      <HomepageClient>
        <Intro />
        <Backstory content={backstory} />
        <FeaturedEssays essays={allEssays} />
        <History />
        <Now />

        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Image
                src="/yazpic1.jpg"
                alt="Yaz Caleb"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-end">
              <Image
                src="/yazpic2.jpg"
                alt="Yaz A. Caleb in childhood"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-md"
              />
              <div className="mt-4 flex items-end justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Current commit, and the first one.
                </p>
                <div className="hidden md:block text-sm text-right text-zinc-500 dark:text-zinc-400">
                  <p className="text-zinc-800 dark:text-zinc-200">
                    Still reading? Good instincts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HomepageClient>

      <div className="md:hidden space-y-4">
        <div>
          <p className="text-zinc-800 dark:text-zinc-200">
            Still reading? Good instincts.
          </p>
          <div className="mt-2 space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="mailto:yaz@plawlabs.com" className="block hover:underline">
              yaz@plawlabs.com
            </a>
            <a href="tel:+16283034902" className="block hover:underline">
              +1 (628) 303-4902
            </a>
          </div>
        </div>
        <div className="space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="https://x.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            X <span className="text-xs text-zinc-400 dark:text-zinc-500">(preferred)</span>
          </a>
          <a
            href="https://instagram.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            Instagram <span className="text-xs text-zinc-400 dark:text-zinc-500">(rare)</span>
          </a>
          <a
            href="https://github.com/plawlost"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            GitHub <span className="text-xs text-zinc-400 dark:text-zinc-500">(shipping daily)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
