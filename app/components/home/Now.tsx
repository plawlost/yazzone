import Image from 'next/image'

export function Now() {
  return (
    <section id="now" className="space-y-6">
      <h2 className="text-xl font-bold">Now</h2>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">→</span>
          <p className="text-zinc-800 dark:text-zinc-200">Raising pre-seed for VulnZap. Coming out of stealth.</p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">→</span>
          <p className="text-zinc-800 dark:text-zinc-200">
            <a
              href="https://plawlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              PlawLabs Ltd
            </a>{' '}
            → Plaw Inc. Relocating to Bay Area.
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">→</span>
          <p className="text-zinc-800 dark:text-zinc-200">Hiring a few founding ML/AI/cybersecurity engineers + designer.</p>
        </div>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">When I'm not in necessary meetings, still architect hands-on:</p>
      <div className="flex">
        <img
          src="https://github-readme-stats.hackclub.dev/api/wakatime?username=3560&api_domain=hackatime.hackclub.com&theme=swift&custom_title=Recent+Programming+Time&layout=compact&cache_seconds=0&langs_count=6"
          alt="Recent coding activity"
          className="opacity-90 w-full sm:w-96 lg:w-[500px]"
        />
      </div>
    </section>
  )
}
