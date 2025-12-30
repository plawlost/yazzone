import { Book } from "app/components/ui/book"

const categories = {
  Strategy: {
    color: "#9D2127",
    books: [
      { title: "Zero to One", author: "Thiel", recommended: true },
      { title: "Chip War", author: "Miller" },
      { title: "Good Strategy Bad Strategy", author: "Rumelt", recommended: true },
      { title: "High Output Management", author: "Grove", recommended: true },
      { title: "Poor Charlie's Almanack", author: "Munger", recommended: true },
      { title: "The Hard Thing About Hard Things", author: "Horowitz" },
      { title: "The Lean Startup", author: "Ries" },
      { title: "Why Nations Fail", author: "Acemoglu" },
    ],
  },
  Philosophy: {
    color: "#4a5568",
    books: [
      { title: "The Beginning of Infinity", author: "Deutsch", recommended: true },
      { title: "The Genealogy of Morals", author: "Nietzsche" },
      { title: "Nicomachean Ethics", author: "Aristotle" },
      { title: "The Republic", author: "Plato", recommended: true },
    ],
  },
  Systems: {
    color: "#7DC1C1",
    textColor: "#0f3d3d",
    books: [
      { title: "Computer Systems", author: "Bryant" },
      { title: "Operating Systems", author: "Arpaci-Dusseau" },
      { title: "Six Not So Easy Pieces", author: "Feynman", recommended: true },
      { title: "Superintelligence", author: "Bostrom", recommended: true },
      { title: "The Fabric of the Cosmos", author: "Greene" },
    ],
  },
  Society: {
    color: "#FED954",
    textColor: "#78350f",
    books: [
      { title: "A Pattern Language", author: "Alexander", recommended: true },
      { title: "Seeing Like a State", author: "Scott", recommended: true },
      { title: "Superforecasting", author: "Tetlock" },
      { title: "The Network State", author: "Balaji" },
      { title: "The Sovereign Individual", author: "Davidson", recommended: true },
      { title: "The Dictator's Handbook", author: "Mesquita" },
    ],
  },
  Fiction: {
    color: "#5B4B8A",
    books: [
      { title: "The Dispossessed", author: "Le Guin", recommended: true },
      { title: "Foundation", author: "Asimov", recommended: true },
      { title: "The Brothers Karamazov", author: "Dostoevsky", recommended: true },
      { title: "The Master and Margarita", author: "Bulgakov" },
      { title: "Hitchhiker's Guide", author: "Adams" },
    ],
  },
}

export function Library() {
  return (
    <section className="space-y-6">
      <details className="group" open>
        <summary className="cursor-pointer list-none">
          <div className="flex items-center space-x-2 group-hover:opacity-80 transition-opacity">
            <h2 className="text-xl font-bold inline-block hover:underline">
              Library
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

        <div className="mt-6 space-y-5">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Finished or will finish by 2026. Ribbon = highly recommend.
          </p>

          {/* CSS-only tab system - flat structure for sibling selectors */}
          
          {/* Hidden radio inputs */}
          <input
            type="radio"
            name="library-category"
            id="lib-tab-strategy"
            className="sr-only lib-radio"
          />
          <input
            type="radio"
            name="library-category"
            id="lib-tab-philosophy"
            className="sr-only lib-radio"
          />
          <input
            type="radio"
            name="library-category"
            id="lib-tab-systems"
            className="sr-only lib-radio"
          />
          <input
            type="radio"
            name="library-category"
            id="lib-tab-society"
            className="sr-only lib-radio"
          />
          <input
            type="radio"
            name="library-category"
            id="lib-tab-fiction"
            className="sr-only lib-radio"
            defaultChecked
          />

          {/* Tab labels */}
          <div className="library-tabs flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <label
              htmlFor="lib-tab-strategy"
              className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600"
            >
              Strategy
            </label>
            <label
              htmlFor="lib-tab-philosophy"
              className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600"
            >
              Philosophy
            </label>
            <label
              htmlFor="lib-tab-systems"
              className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600"
            >
              Systems
            </label>
            <label
              htmlFor="lib-tab-society"
              className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600"
            >
              Society
            </label>
            <label
              htmlFor="lib-tab-fiction"
              className="cursor-pointer transition-colors text-zinc-400 hover:text-zinc-600"
            >
              Fiction
            </label>
          </div>

          {/* Book panels - each as direct sibling */}
          <div className="library-panels">
            <div
              id="panel-strategy"
              className="lib-panel overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            >
              <div className="flex gap-5 pt-5 items-start">
                {categories.Strategy.books.map((book) => (
                  <Book
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    color={categories.Strategy.color}
                    textColor="white"
                    recommended={book.recommended}
                  />
                ))}
              </div>
            </div>

            <div
              id="panel-philosophy"
              className="lib-panel overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            >
              <div className="flex gap-5 pt-5 items-start">
                {categories.Philosophy.books.map((book) => (
                  <Book
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    color={categories.Philosophy.color}
                    textColor="white"
                    recommended={book.recommended}
                  />
                ))}
              </div>
            </div>

            <div
              id="panel-systems"
              className="lib-panel overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            >
              <div className="flex gap-5 pt-5 items-start">
                {categories.Systems.books.map((book) => (
                  <Book
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    color={categories.Systems.color}
                    textColor={categories.Systems.textColor}
                    recommended={book.recommended}
                  />
                ))}
              </div>
            </div>

            <div
              id="panel-society"
              className="lib-panel overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            >
              <div className="flex gap-5 pt-5 items-start">
                {categories.Society.books.map((book) => (
                  <Book
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    color={categories.Society.color}
                    textColor={categories.Society.textColor}
                    recommended={book.recommended}
                  />
                ))}
              </div>
            </div>

            <div
              id="panel-fiction"
              className="lib-panel overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide"
            >
              <div className="flex gap-5 pt-5 items-start">
                {categories.Fiction.books.map((book) => (
                  <Book
                    key={book.title}
                    title={book.title}
                    author={book.author}
                    color={categories.Fiction.color}
                    textColor="white"
                    recommended={book.recommended}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </details>
    </section>
  )
}
