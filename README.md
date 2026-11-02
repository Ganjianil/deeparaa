# Deepara Solutions — ABDM-inspired redesign

Existing Deepara Solutions website built with Next.js, React, TypeScript, and Tailwind CSS. The UI theme is inspired by the clean, structured visual language of the ABDM documentation portal; it retains Deepara's own business content and routes.

## Run locally (Windows PowerShell)

1. Extract the ZIP.
2. Open the **inner `deepara-main` folder** in VS Code (the folder that contains this `package.json`).
3. Open a terminal in that folder and run:

```powershell
npm install
npm run dev
```

4. Open http://localhost:3000.

If you see `'next' is not recognized`, you are either in the wrong folder or dependencies have not been installed in this folder. Confirm `dir package.json` shows the project file, then run `npm install` again here.

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint (availability depends on the installed Next.js/ESLint versions)

## Structure

- `app/` — App Router pages and shared global stylesheet
- `components/` — reusable page sections and navigation
- `data/` — JSON content for services, FAQs, tools, and related sections
- `public/` — site images and client logos

## Design notes

The site-wide styles in `app/globals.css` establish a consistent pale blue documentation-inspired background, blue/teal accents, quieter card borders and shadows, typography hierarchy, responsive behavior, and form focus states. The original brand and business content are retained. This is a design adaptation, not an exact copy of ABDM branding or its healthcare-specific content.
