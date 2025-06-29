export function Projects({ projects }) {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold bg-purple-50 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-2 rounded-lg inline-block">Projects</h2>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.title} className="flex items-baseline space-x-4">
            <span className="text-lg">•</span>
            <div className="space-y-1">
              {project.url ? (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-lg underline decoration-1 underline-offset-2">{project.title}</a>
              ) : (
                <span className="text-lg font-semibold">{project.title}</span>
              )}
              <p className="text-base" dangerouslySetInnerHTML={{ __html: project.description }}></p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
} 