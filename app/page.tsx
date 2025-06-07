import Link from 'next/link'
import Image from 'next/image'
import { getEssays, getHomepageData, getBackstoryData } from 'app/essays/utils'
import { CustomMDX } from 'app/components/mdx';
import { formatDate } from 'app/lib/format'
import { TldrButton } from 'app/components/tldr-button'
import { Intro } from 'app/components/home/Intro'
import { Backstory } from 'app/components/home/Backstory'
import { FeaturedEssays } from 'app/components/home/FeaturedEssays'
import { Projects } from 'app/components/home/Projects'
import { DynamicInfo } from 'app/components/home/DynamicInfo'
import { WikipediaLink } from 'app/components/WikipediaLink'

export default function Page() {
  const allEssays = getEssays()
  const { projects, now } = getHomepageData()
  const backstory = getBackstoryData()

  const homepageText = `
    Hi there, I'm Yaz, 16, building what Silicon Valley forgot.
    Full-time founder at PlawLabs since '22. Remotely, based in London.
    Dropped out to build agent-native tools, write iconoclastic essays, and live like the internet's still a frontier.
    Teenage years aren't for waiting. They're for shipping and betting.
    ${backstory}
    ${allEssays.slice(0, 3).map(e => e.metadata.title).join('. ')}
    ${projects.map(p => `${p.title}: ${p.description.replace(/<[^>]*>?/gm, '')}`).join('. ')}
    ${now}
  `

  return (
    <div className="space-y-16 max-w-4xl">
      <header className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Image
          src="/favicon.ico"
          alt="Yaz Celebi"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div className="space-y-1">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Yagiz E. Celebi.</h1>
          <p className="text-lg sm:text-xl pl-0.5 sm:pl-1">Founder. Architect. Outlier.</p>
        </div>
      </header>

      <Intro />
      <DynamicInfo />
      <Backstory content={backstory} />
      <FeaturedEssays essays={allEssays} />
      <Projects projects={projects} />
      
      <section className="space-y-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
          <h2 className="text-2xl font-bold bg-orange-50 px-3 py-2 rounded-lg inline-block w-fit">Now</h2>
          <div className="flex items-center">
            <Image
              src="/sketch.svg"
              alt="Take me to SF sketch"
              width={140}
              height={90}
              className="opacity-80"
            />
          </div>
        </div>
        <div className="prose prose-lg max-w-none whitespace-pre-line">
          <CustomMDX source={now} components={{ WikipediaLink }}/>
        </div>
        
        {/* Coding Stats */}
        <div className="mt-8 space-y-3">
          <p className="text-sm text-black/60">When I'm not in meetings or strategizing, I still ship code & design:</p>
          <div className="flex">
            <Image
              src="https://github-readme-stats.hackclub.dev/api/wakatime?username=3560&api_domain=hackatime.hackclub.com&theme=swift&custom_title=Recent+Dev+Time&layout=compact&cache_seconds=0&langs_count=6"
              alt="Recent coding activity"
              width={420}
              height={150}
              className="opacity-90 w-full sm:w-96 lg:w-[500px]"
            />
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Image
              src="/yazpic1.jpg"
              alt="Yagiz E. Celebi"
              width={400}
              height={500}
              className="w-full object-cover"
            />
          </div>
          <div className="lg:col-span-2 flex flex-col justify-end">
            <Image
              src="/yazpic2.jpg"
              alt="Yagiz E. Celebi in childhood"
              width={600}
              height={400}
              className="w-full object-cover"
            />
            <div className="mt-4 text-sm text-black/60">
              <p>Current commit, and the first one.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="pt-16 pb-8 space-y-6">
        <p className="text-lg text-black/80">
          Still reading? Maybe you're one of us. Reach out.
        </p>

        <div className="space-y-2">
          <p className="text-base text-black/80">I reply to every real message within a day.</p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-black/60">
              <a href="mailto:yaz@plawlabs.com" className="underline">yaz@plawlabs.com</a>
              <a href="tel:+16283034902" className="underline">+1 (628) 303-4902</a>
          </div>
        </div>
        
        <div className="border-t border-black/10 pt-6">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-black/60">
              <a
                href="https://x.com/plawlost"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                aria-label="X (best way to reach me)"
              >
                X <span className="text-xs text-black/40">(best)</span>
              </a>
              <a
                href="https://instagram.com/plawlost"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                aria-label="Instagram (rarely active)"
              >
                Instagram <span className="text-xs text-black/40">(barely active)</span>
              </a>
              <a
                href="https://github.com/plawlost"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                aria-label="GitHub (barely active)"
              >
                GitHub <span className="text-xs text-black/40">(kinda new)</span>
              </a>
            </div>
        </div>
      </footer>
      
      <TldrButton text={homepageText} isFloating={true} />
    </div>
  )
}
