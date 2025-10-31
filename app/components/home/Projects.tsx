export function Projects({ projects }) {
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="space-y-6">
        {projects.map((project) => (
          <div key={project.title}>
            <div className="space-y-1">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-lg underline decoration-1 underline-offset-2 hover:text-black/70 dark:hover:text-white/70 transition-colors">{project.title}</a>
              ) : (
                <span className="text-lg font-semibold">{project.title}</span>
              )}
              <p className="text-base text-black/80 dark:text-white/80" dangerouslySetInnerHTML={{ __html: project.description }}></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 