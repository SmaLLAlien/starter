---
name: add-api-endpoint
description: Use when the app needs its own backend endpoint (form submission, data the client should not hard-code). Adds an Express route under /api in server/ and a typed Angular service calling it.
---

# Add an API endpoint

Server (`server/`, separate npm package, ESM):

1. Create a router per resource, e.g. `server/src/routes/contacts.ts`:
   ```ts
   import { Router } from 'express';

   export const contactsRouter = Router();

   contactsRouter.post('/', (req, res) => {
     const { name, message } = req.body as { name?: unknown; message?: unknown };
     if (typeof name !== 'string' || typeof message !== 'string' || !name.trim()) {
       res.status(400).json({ error: 'name and message are required' });
       return;
     }
     res.status(201).json({ ok: true });
   });
   ```
   Validate every input field; never trust the body shape.
2. Mount it in `server/src/routes/api.ts` **before** the JSON 404 handler:
   `apiRouter.use('/contacts', contactsRouter);` (import with the `.js` extension).
   If the endpoint reads JSON bodies, make sure `express.json()` is applied for `/api` in `server/src/app.ts`.
3. Settings (URLs, limits) go to `server/config/{dev,test,prod}.json`; secrets only via env variables.

Client (`src/`):

4. Add `provideHttpClient(withFetch())` to `app.config.ts` if it is not there yet.
5. Create a typed service in the feature folder, e.g. `src/app/contact/contact.service.ts`, using
   `inject(HttpClient)` and relative URLs (`/api/contacts`). In dev, proxy `/api` to the server with a
   `proxy.conf.json` (`{ "/api": { "target": "http://localhost:3000" } }`) referenced from `angular.json`
   `serve.options.proxyConfig`.
6. Verify: `npm run build` in both root and `server/`.
