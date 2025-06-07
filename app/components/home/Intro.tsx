import Link from 'next/link'
import { WikipediaLink } from 'app/components/WikipediaLink'

export function Intro() {
  return (
    <section className="space-y-6">
      <p className="text-xl leading-relaxed max-w-3xl">
        Hi there, I'm Yaz, 16, building what <WikipediaLink keyword="Silicon Valley">Silicon Valley</WikipediaLink> forgot.
        <br />
        Full-time founder at{' '}
        <a
          href="https://www.plawlabs.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-1 underline-offset-2"
        >
          PlawLabs
        </a>{' '}
        since '22. Nomad, remotely based in London.
        <br />
        Dropped out to build agent-native tools, write iconoclastic essays, and live like the internet's still a frontier.
        <br />
        Teenage years aren't for waiting. They're for shipping and betting.
      </p>
    </section>
  )
} 