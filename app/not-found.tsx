export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <p className="text-[12rem] font-extralight leading-none tracking-tighter text-zinc-200 dark:text-zinc-700 select-none">
        404
      </p>
      <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
        This page doesn't exist.
      </p>
      <a 
        href="/" 
        className="mt-8 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors no-underline hover:no-underline"
      >
        Return home
      </a>
    </section>
  )
}
