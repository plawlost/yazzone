'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { TldrButton } from 'app/components/tldr-button'
import { Intro } from 'app/components/home/Intro'
import { Backstory } from 'app/components/home/Backstory'
import { FeaturedEssays } from 'app/components/home/FeaturedEssays'
import { History } from './History'
import { Now } from './Now'

interface Essay {
  slug: string;
  metadata: {
    title: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface HomepageClientProps {
  essays: Essay[]
  backstory: {
    content: string;
    data: { [key: string]: any };
  };
}

export function HomepageClient({ essays, backstory }: HomepageClientProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [homepageText, setHomepageText] = useState('')

  useEffect(() => {
    if (contentRef.current) {
      setHomepageText(contentRef.current.innerText)
    }
  }, [])

  return (
    <div className="md:col-span-2 space-y-12 md:space-y-16" ref={contentRef}>
      <Intro />
      <Backstory content={backstory} />
      <FeaturedEssays essays={essays} />
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
  )
}
