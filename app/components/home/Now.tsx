import { WakaTimeChart } from "../WakaTimeChart";

export async function Now() {
  return (
    <section id="now" className="space-y-6">
      <h2 className="text-xl font-bold">Now</h2>
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">•</span>
          <p className="text-zinc-800 dark:text-zinc-200">
            <a
              href="https://plaw.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Plaw
            </a>{" "}
            (cofounder) — building{" "}
            <a
              href="https://vulnzap.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              VulnZap
            </a>{" "}
            (security for AI-generated code) and{" "}
            <a
              href="https://veto.run"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Veto
            </a>{" "}
            (agent authorization). Closing $1M pre-seed—
            <a
              href="mailto:yaz@plaw.io"
              className="text-zinc-500 dark:text-zinc-400 underline"
            >
              angel spots open
            </a>
            .
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">•</span>
          <p className="text-zinc-800 dark:text-zinc-200">
            Part-time at{" "}
            <a
              href="https://asu.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              ASU
            </a>{" "}
            — CS/Econ classes, research in their AI/cybersecurity labs.
          </p>
        </div>
        <div className="flex items-start space-x-3">
          <span className="text-zinc-500 dark:text-zinc-400 pt-1">•</span>
          <p className="text-zinc-800 dark:text-zinc-200">
            Hiring 2 founding engineers (AI/ML, systems, security) and a product
            designer.
          </p>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3">
          Still hands-on:
        </p>
        <WakaTimeChart />
      </div>
    </section>
  );
}
