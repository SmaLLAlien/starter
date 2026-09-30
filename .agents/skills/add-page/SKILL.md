---
name: add-page
description: Use when adding a new page/screen to the app. Creates a lazy-loaded route with its page component following the starter conventions.
---

# Add a page

1. Pick a kebab-case feature name, e.g. `about`. The page lives in `src/app/about/`.
2. Generate the component (creates `about-page.ts`, `.html`, `.css`, `.spec.ts`):
   ```bash
   npx ng generate component about/about-page --change-detection OnPush
   ```
   Remove `standalone: true` if the generator added it. Delete the `.css` file if it stays empty and
   drop `styleUrl`.
3. Register a lazy route in `src/app/app.routes.ts`:
   ```ts
   { path: 'about', title: 'About', loadComponent: () => import('./about/about-page').then((m) => m.AboutPage) },
   ```
   Keep a default route (`path: ''`) and, if the app has several pages, a `**` route redirecting to it.
4. Add a link in the navigation (usually the header component) with `routerLink="/about"` and
   `routerLinkActive` for the current page; import `RouterLink`/`RouterLinkActive` in that component.
5. Page content: one `<h1>` per page, semantic sections, texts from the plan. Data goes into a service
   in the same feature folder (`about.service.ts`, `providedIn: 'root'`).
6. Verify: `npm run build`, `npm test -- --watch=false`.
