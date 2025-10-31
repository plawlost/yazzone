import Link from 'next/link'
import Image from 'next/image'
import { getEssays, getHomepageData, getBackstoryData } from 'app/essays/utils'
import { ThemeToggle } from 'app/components/ThemeToggle'
import { Intro } from './components/home/Intro'
import { Backstory } from './components/home/Backstory'
import { FeaturedEssays } from './components/home/FeaturedEssays'
import { History } from './components/home/History'
import { Now } from './components/home/Now'
import { TldrButton } from 'app/components/tldr-button'

const homepageText = `
Intro:
Building the tools that make AI actually useful. Remotely HQ'd in London. Left school at 16 because the future doesn't wait for permission. Now I design agentic infrastructure that works the way humans think, write what everyone else is too careful to say, and build like the internet's still a frontier. The best time to start was yesterday. The second best is now.

Backstory:
I was born Yağız Erkam Çelebi. Grew up in Ankara, half-Albanian, self-taught English and Computer Science, and finished high school 3 years early to be able to pursue building full-time. Most of what I know came from open courses and documentation: Harvard CS, MIT lectures, YC Startup School, and a lot of debugging at 3 a.m. I like systems work, product architecture, and writing clearly about what I'm building.
At 14 I built Clade AI — a hardware-native assistant that ran off-device. We shipped prototypes, learned the hard problems of voice, latency, and inference at the edge, then shut it down when the team collapsed. Around the same time I became one of the first civilian testers of GPT-2 and DALL·E 1, which pulled me deep into generative models and human-machine interfaces.
That same year I gave a TED-Ed talk on Terms and Conditions. Since then I've kept a steady rhythm of publishing essays that pressure-test ideas in public. I train, read, and ship. I prefer small, composable tools over platforms that try to do everything.
Today I'm mostly building agent-native security and developer infrastructure. The computer now writes more code than humans can audit, so I'm focused on AI sovereignty, trust, observability, and safe full-autonomy. I live mostly on the road, work remotely across Europe and Asia, and look for high-agency collaborators. If something matters, I build it, measure it, and keep what survives contact with reality.

History:
- Cofounder and CEO, VulnZap (Plaw, Inc.): Built-in security for coding agents/IDEs.
- Creative Copywriter, Cluely, Inc.: A short-term role where I helped refine tone and campaigns, learning a ton about brand and clarity.
- Product Engineer, ThirdLayer, Inc. (YC W25): Worked on Dex, an AI copilot for browsing. A great temporary role, though the time difference was a killer.
- Cofounder, HyperCover: An attempt at "Tinder for job apps." Failed fast. Wrong timing, right intuition.
- Founder, Various Experiments: CYDE and other experiments in Edtech, AI, and agency work. All were lessons that led to one realization: it was time to build something that mattered.
- Founder, Clade AI: My first real startup. A hardware-native AI assistant built at 14. Scaled to a team of 30+ before shutting down.

Now:
- Raising pre-seed for VulnZap. Coming out of stealth.
- PlawLabs Ltd → Plaw Inc. Relocating to Bay Area.
- Hiring a few founding ML/AI/cybersecurity engineers + designer.
- I ship fast and orchestrate domain experts across the full stack.
`

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

      <div className="md:col-span-2 space-y-12 md:space-y-16">
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
        <TldrButton text={homepageText} isFloating={true} />
      </div>

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
