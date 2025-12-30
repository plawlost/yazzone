import Link from 'next/link'
import { getEssays, getHomepageData, getBackstoryData } from 'app/essays/utils'
import { Intro } from './components/home/Intro'
import { Backstory } from './components/home/Backstory'
import { FeaturedEssays } from './components/home/FeaturedEssays'
import { History } from './components/home/History'
import { Now } from './components/home/Now'
import { Library } from './components/home/Library'

// Static TL;DR dropdown component - CSS only, no JS
function TldrDropdown({ title }: { title?: string }) {
  const pageUrl = 'https://yaz.zone'
  const prompt = title
    ? `Read this page and summarize it in crisp bullet points: ${pageUrl}

Title: "${title}"

Be direct—every bullet should carry weight. Include key arguments, facts, and conclusions. Skip filler. After summarizing, ask if I have questions.`
    : `Read this page and summarize it in crisp bullet points: ${pageUrl}

Be direct—every bullet should carry weight. Include key arguments, facts, and conclusions. Skip filler. After summarizing, ask if I have questions.`

  const encodedPrompt = encodeURIComponent(prompt)

  return (
    <details className="tldr-dropdown">
      <summary>TL;DR</summary>
      <div className="tldr-menu">
        <div className="py-1">
          <a
            href={`https://chatgpt.com/?m=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            ChatGPT
            <span className="text-xs text-zinc-400">↗</span>
          </a>
          <a
            href={`https://claude.ai/new?q=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            Claude
            <span className="text-xs text-zinc-400">↗</span>
          </a>
          <a
            href={`https://www.perplexity.ai/search?q=${encodedPrompt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tldr-link"
          >
            Perplexity
            <span className="text-xs text-zinc-400">↗</span>
          </a>
        </div>
        <div className="tldr-footer">
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            AI will read &amp; summarize this page
          </p>
        </div>
      </div>
    </details>
  )
}

export default function Page() {
  const allEssays = getEssays()
  const { now } = getHomepageData()
  const backstory = getBackstoryData()

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Yaz Caleb',
            alternateName: ['Yaz A. Caleb', 'Yagiz Erkam Celebi', 'Yagiz Celebi', 'Yagiz Erkam Celebi', 'Yaz Celebi', 'Yagiz Erkam'],
            url: 'https://yaz.zone',
            image: 'https://yaz.zone/yaz-latest.jpg',
            description: 'Left school at 16. Built my first company at 14. Now building what AI needs to run without asking permission.',
            jobTitle: 'Cofounder & CEO',
            worksFor: {
              '@type': 'Organization',
              name: 'Plaw Inc.',
              url: 'https://plaw.io',
              sameAs: ['https://vulnzap.com', 'https://veto.run'],
            },
            sameAs: [
              'https://x.com/yazcal',
              'https://github.com/plawlost',
              'https://instagram.com/yazcaleb',
            ],
            knowsAbout: ['AI agents', 'authorization', 'infrastructure', 'security', 'startups'],
            alumniOf: {
              '@type': 'EducationalOrganization',
              name: 'Arizona State University',
            },
            birthDate: '2008',
            nationality: 'Turkish',
          }),
        }}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto">
      <div className="md:col-span-1 space-y-8 md:space-y-12">
        <header className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src="/favicon.ico"
              alt="Yaz Caleb"
              width={64}
              height={64}
              className="rounded-full"
              decoding="async"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Yaz A. Caleb.
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-4 text-sm">
              <a href="#now" className="text-zinc-500 dark:text-zinc-400 hover:underline">Now</a>
              <a href="#history" className="text-zinc-500 dark:text-zinc-400 hover:underline">History</a>
              <a href="/essays" className="text-zinc-500 dark:text-zinc-400 hover:underline">Essays</a>
            </nav>
          </div>
        </header>

        <div className="hidden md:block space-y-4">
          <div className="space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <a href="mailto:yaz@plaw.io" className="block hover:underline">
              yaz@plaw.io
            </a>
            <a href="https://wa.me/16283034902" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              +1 (628) 303-4902
            </a>
            <a href="https://cal.com/yaz" target="_blank" rel="noopener noreferrer" className="block hover:underline">
              Schedule a call
            </a>
          </div>
        </div>

        <div className="hidden md:block space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
          <a
            href="https://x.com/yazcal"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            X <span className="text-xs text-zinc-400 dark:text-zinc-500">(preferred)</span>
          </a>
          <a
            href="https://instagram.com/yazcaleb"
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
            Github <span className="text-xs text-zinc-400 dark:text-zinc-500">(in-progress)</span>
          </a>
          <a
            href="https://asu.academia.edu/YazCaleb"
            target="_blank"
            rel="noopener noreferrer"
            className="block hover:underline"
          >
            Academia <span className="text-xs text-zinc-400 dark:text-zinc-500">(new)</span>
          </a>
        </div>

        
      </div>

      <div className="md:col-span-2 space-y-12 md:space-y-16">
        <Intro />
        <Backstory content={backstory} />
        <Library />
        <FeaturedEssays essays={allEssays} />
        <Now />
        <History />

        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 film-grain">
              <img
                src="/yaz-latest.jpg"
                alt="Yaz Caleb"
                width={1031}
                height={1834}
                loading="lazy"
                decoding="async"
                className="w-full h-auto max-h-[550px] md:max-h-none md:max-w-none rounded-md grayscale contrast-[1.1] brightness-[1.1] object-cover object-[center_20%]"
              />
            </div>
            <div className="md:col-span-2 flex flex-col justify-end">
            <div className="film-grain">
              <img
                src="/yazpic2.jpg"
                alt="Yaz A. Caleb in childhood"
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-auto object-cover rounded-md grayscale contrast-[1.1]"
              />
            </div>
              <div className="mt-4 flex items-end justify-between">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Current commit, and the first one.
                </p>
              </div>
            </div>
          </div>
        </section>

        <p className="text-sm text-zinc-400 dark:text-zinc-500 italic max-w-xl">
          "When you build a thing you cannot merely build that thing in isolation, but must repair the world around it, and within it." — Christopher Alexander
        </p>

        <TldrDropdown title="Yaz Caleb — Homepage" />
      </div>

      <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-8">
        <div className="grid grid-cols-2 gap-4 text-sm text-zinc-500 dark:text-zinc-400">
          <div className="space-y-1">
            <a href="mailto:yaz@plaw.io" className="block hover:underline">yaz@plaw.io</a>
            <a href="https://wa.me/16283034902" target="_blank" rel="noopener noreferrer" className="block hover:underline">+1 (628) 303-4902</a>
            <a href="https://cal.com/yaz" target="_blank" rel="noopener noreferrer" className="block hover:underline">Schedule a call</a>
          </div>
          <div className="space-y-1">
            <a href="https://x.com/yazcal" target="_blank" rel="noopener noreferrer" className="block hover:underline">X</a>
            <a href="https://instagram.com/yazcaleb" target="_blank" rel="noopener noreferrer" className="block hover:underline">Instagram</a>
            <a href="https://github.com/plawlost" target="_blank" rel="noopener noreferrer" className="block hover:underline">Github</a>
            <a href="https://asu.academia.edu/YazCaleb" target="_blank" rel="noopener noreferrer" className="block hover:underline">Academia</a>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
