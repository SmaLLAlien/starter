# AGENTS.md

Instructions for AI agents (and humans) working on a project created from the company starter.

## Project

Angular 21 single-page app (`src/`) plus a small Express 5 + TypeScript server (`server/`) that serves
the compiled app and hosts the API under `/api`. Keep this structure; do not switch frameworks, add
state-management libraries or CSS frameworks unless the task explicitly requires it.

```
src/
  app/
    app.ts, app.html        root component (layout, <router-outlet />)
    app.routes.ts           routes — every page is lazy-loaded
    app.config.ts           application providers
    <feature>/              one folder per feature/page: component, service, spec
  styles.css                global styles and design tokens (CSS custom properties)
public/                     static assets copied as is
server/                     separate npm package (own package.json and node_modules)
  src/index.ts              http server start
  src/app.ts                Express app: /api, static files
  src/routes/api.ts         API router — add endpoints here or in sibling routers
  config/{dev,test,prod}.json   settings via the `config` package (NODE_CONFIG_ENV)
docs/                       project docs; docs/PLAN.md — the current implementation plan
```

## Commands

| Where | Command | What |
|---|---|---|
| root | `npm install` | install dependencies (once) |
| root | `npm start` | dev server on http://localhost:4200 |
| root | `npm run build` | production build → `dist/<project>/browser` |
| root | `npm test -- --watch=false` | unit tests (Vitest) once |
| `server/` | `npm install`, `npm run dev` | API server on http://localhost:3000 |

## Rules

- **Angular: follow [.agents/rules/angular-best-practices.md](.agents/rules/angular-best-practices.md)**,
  including the Angular 21 overrides at its top.
- TypeScript strict, no `any`. Prettier: `printWidth: 100`, `singleQuote: true`.
- Components: standalone (do not write `standalone: true`), `changeDetection: OnPush`, `input()` /
  `output()`, signals and `computed()`, native control flow (`@if`, `@for`), `inject()`.
- One component per folder under its feature; small components may use inline templates.
- Styles: design tokens (colours, fonts, spacing) as CSS custom properties in `src/styles.css`;
  component styles only for layout of that component. Support light and dark (`prefers-color-scheme`).
- Accessibility: semantic HTML, labels for inputs, `alt` for images, visible focus, WCAG AA contrast.
- Data: typed interfaces; static/mock data behind a service so it can later come from the API.
- Server: ESM with `.js` in relative imports; settings only through `config`; secrets only from env.

## Definition of done

- `npm run build` passes without errors.
- `npm test -- --watch=false` passes; new components/services get a spec that at least creates them.
- No leftover placeholder content from the starter (the default Angular welcome page is removed).
