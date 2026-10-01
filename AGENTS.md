# AGENTS.md

Instructions for AI agents (and humans) working on a project created from the company starter.

## Project

Angular 21 single-page app (`src/`) plus a small Express 5 + TypeScript server (`server/`) that serves
the compiled app and hosts the API under `/api`. The UI is built with **Angular Material** in the company theme.
Keep this structure; do not switch frameworks, add state-management libraries or CSS frameworks unless
the task explicitly requires it.

```
src/
  app/
    app.ts, app.html        root component (layout, <router-outlet />)
    app.routes.ts           routes — every page is lazy-loaded
    app.config.ts           application providers
    <feature>/              one folder per feature/page: component, service, spec
  theme.scss                Angular Material 3 theme (company colour #4ea524, light/dark)
  _theme-colors.scss        generated palettes — regenerate, do not edit by hand
  styles.css                global styles (use Material system tokens --mat-sys-*)
public/                     static assets copied as is
server/                     separate npm package (own package.json and node_modules)
  src/index.ts              http server start
  src/app.ts                Express app: /api, static files
  src/routes/api.ts         API router — add endpoints here or in sibling routers
  config/{dev,test,prod}.json   settings via the `config` package (NODE_CONFIG_ENV)
docs/                       project docs: PLAN.md — current plan, DECISIONS.md — key decisions and why
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
- **TypeScript: follow [.agents/rules/typescript-best-practices.md](.agents/rules/typescript-best-practices.md).**
  Prettier: `printWidth: 100`, `singleQuote: true`.
- **UI: Angular Material.** Buttons, form fields, dialogs, menus, lists, toolbar, sidenav, snackbars —
  Material components (import only the modules a component uses, e.g. `MatButtonModule`). Icons:
  `<mat-icon>` with Material Symbols. Do not hand-roll a component Material already has.
- Components: standalone (do not write `standalone: true`), `changeDetection: OnPush`, `input()` /
  `output()`, signals and `computed()`, native control flow (`@if`, `@for`), `inject()`.
- One component per folder under its feature; small components may use inline templates.
- Styles: colours and typography only from the theme — Material system tokens (`var(--mat-sys-primary)`,
  `--mat-sys-surface`, `--mat-sys-on-surface`, `--mat-sys-body-large`…), never hard-coded colours, so the
  light/dark theme keeps working. Component styles only for layout of that component.
- Decisions: record key decisions (design, structure, data source, scope cuts) in `docs/DECISIONS.md`.
- Accessibility: semantic HTML, labels for inputs, `alt` for images, visible focus, WCAG AA contrast.
- Data: typed interfaces; static/mock data behind a service so it can later come from the API.
- Server: ESM with `.js` in relative imports; settings only through `config`; secrets only from env.

## Definition of done

- `npm run build` passes without errors.
- `npm test -- --watch=false` passes; new components/services get a spec that at least creates them.
- No leftover placeholder content from the starter (the default Angular welcome page is removed).
