import { CustomMDX } from 'app/components/mdx'
import { WikipediaLink } from 'app/components/WikipediaLink'

export function Backstory({
  content,
}: {
  content: { content: string; data: { [key: string]: any } }
}) {
  return (
    <section className="space-y-6">
      <details className="group">
        <summary className="cursor-pointer list-none">
          <div className="flex items-center space-x-2 group-hover:opacity-80 transition-opacity">
            <h2 className="text-xl font-bold inline-block hover:underline">
              Backstory
            </h2>
            <svg
              className="w-5 h-5 text-black/60 dark:text-white/60 transition-transform duration-300 ease-in-out group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </summary>
        <div className="mt-4 prose prose-sm max-w-none backstory-prose">
          <CustomMDX source={content} components={{ WikipediaLink }} />
        </div>
      </details>
    </section>
  )
}
