import { CustomMDX } from 'app/components/mdx'
import { WikipediaLink } from 'app/components/WikipediaLink'

export function Backstory({ content }: { content: string }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold bg-blue-50 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-2 rounded-lg inline-block">Backstory</h2>
      <details className="group">
        <summary className="cursor-pointer text-lg underline decoration-1 underline-offset-2 list-none">
          <span className="group-open:hidden">Expand to read more</span>
          <span className="hidden group-open:inline">Collapse</span>
        </summary>
        <div className="mt-4 prose prose-lg max-w-none">
          <CustomMDX source={content} components={{ WikipediaLink }} />
        </div>
      </details>
    </section>
  )
} 