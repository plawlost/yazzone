# AGENTS.md

## Commands
```bash
pnpm install          # Install deps
pnpm dev              # Dev server at localhost:3000
pnpm build            # Production build (validates types)
```
No test runner configured. Use `pnpm build` to catch type errors.

## Code Style
- **Imports**: Node built-ins first, then external packages, then local modules
- **Types**: Define types in-file (see `app/essays/utils.ts:5-14`). `strict: false` but `strictNullChecks: true`
- **Naming**: PascalCase components, camelCase functions/variables, kebab-case files
- **Components**: Functional with TypeScript, use `next-themes` for dark mode
- **Errors**: Return `undefined` for missing data (no throwing), let Next.js handle 404s

## Structure
```
app/                  # Next.js 14 App Router
  components/         # Shared React components
  essays/             # Essay routes + utils.ts (content loading)
  lib/                # Utilities (format.ts)
data/essays/          # Markdown essays with frontmatter (title, publishedAt, summary)
public/               # Static assets
```
