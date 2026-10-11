<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Parrotia: project rules

## About the project

Parrotia is a bilingual (English and Persian/Farsi) plant disease and plant health website, built by a plant pathologist as a frontend portfolio project. Audience: home gardeners, students, teachers, and plant pathologists. Tone: calm, trustworthy, scientific.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS, next-intl, Fuse.js. Content lives in JSON files in the repo (no backend in Phase 1).

## Code rules

- Use TypeScript everywhere. Avoid `any`.
- Use Tailwind **logical classes only** so RTL works: `ms-`, `me-`, `ps-`, `pe-`, `text-start`, `start-0`. Never use `ml-`, `mr-`, `pl-`, `pr-`, `text-left`, `text-right`, `left-0`, `right-0`.
- Icons with direction (arrows, chevrons) must flip in RTL.
- Keep components small and reusable, one component per file in `src/components/`.
- Use `next/image` for images and `next/link` for links.

## Internationalization

- Locales: `en` (LTR) and `fa` (RTL). Set `lang` and `dir` on `<html>` per locale.
- All UI text goes in `messages/en.json` and `messages/fa.json`. No hardcoded strings in components.
- Fonts: Inter for English, Vazirmatn for Persian.
- Content with missing Persian text falls back to English.

## Data

- Read disease data only through `src/lib/diseases.ts`. Components never import JSON directly.
- Types live in `src/lib/types.ts`.
- Every image needs `alt`, `author`, `license`, and `sourceUrl`.
- Management advice stays general. No pesticide doses or brand names.

## Design

- Colors: forest green `#1F5C3A`, cream `#FAF7F0`, near-black green `#1F2A24`, autumn crimson `#B5452B` (used sparingly for warnings and severity).
- Calm, high contrast, accessible. Meet WCAG AA contrast and keep visible focus states.

## Working style

- Check the official docs for Next.js and next-intl instead of guessing setup details.
- Explain changes before making them.
- Make small changes and keep commits focused, with English messages like `feat: add disease card`.
- Don't add new dependencies without asking.
