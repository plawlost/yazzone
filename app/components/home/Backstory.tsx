import { CustomMDX } from 'app/components/mdx'
import { WikipediaLink } from 'app/components/WikipediaLink'

export function Backstory({ content }: { content: string }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Backstory</h2>
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