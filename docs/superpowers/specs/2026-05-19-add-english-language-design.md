# Design: Add English (`en`) as a second language

Date: 2026-05-19
Status: Approved (local-only execution; no commit/push until user validates)

## Goal

Add English as a second site language to the Nuxt 4 + `@nuxtjs/i18n` + `@nuxt/content`
project. German (`de`) stays the default at `/`; English is served under `/en/...`.
All changes stay local and uncommitted — the user validates the running site in the
browser before any commit/push (push = live production deploy).

## Scope

1. i18n config: add `en` locale.
2. `i18n/locales/en.json`: translated UI strings, key-identical to `de.json`.
3. `content/en/`: all 23 markdown files mirrored from `content/de/`, professionally
   translated (transcreation).
4. New `language-switcher.vue` component, integrated into desktop + mobile nav.
5. Correctness fix: add missing locale `watch` to `pages/projects/[slug].vue`.

Out of scope: visual redesign, SEO/hreflang tuning beyond i18n defaults, changing
the `noindex` on project pages, committing/pushing.

## 1. i18n configuration — `nuxt.config.ts`

```ts
i18n: {
  locales: [
    { code: 'de', file: 'de.json', name: 'Deutsch' },
    { code: 'en', file: 'en.json', name: 'English' },
  ],
  defaultLocale: 'de',
  strategy: 'prefix_except_default',
}
```

Strategy unchanged: `de` has no URL prefix, `en` is prefixed `/en`.
`NuxtLinkLocale` / `switchLocalePath` work automatically.

## 2. UI strings — `i18n/locales/en.json`

Mirror the exact key structure of `de.json` (including the unused `hello` key, for
structural parity / no missing-key warnings). Translate: `nav.*`, `footer.*`,
`reference.*`, `common.*`, `projects.back`.

## 3. Content translation — `content/en/` (mirror of `content/de/`)

All 23 files, same relative paths and identical frontmatter keys; only values
translated.

Files: `home.md`, `about.md`, `imprint.md`, `privacy.md`,
`services/{services,corporate,marketing,change}.md`, `projects/overview.md`,
`projects/cases/{1..14}.md`.

**Preserved verbatim (never translated):** `key:`, `link:`, `logo:`, `file:`,
`type:`, image/media filenames, `\n` line breaks, emails, URLs, IDs (UID,
Handelsregister number).

**Proper nouns kept original:** person names (Katja/Catrin/Ben Brändle), company
names (CoRelation GmbH, Energie 360°, Tradedoubler AG, admazing AG), the postal
address block including "Zürich"/"Schweiz" (it is a mailing address), SPAG,
certificate/institution names.

**Translated:** all descriptive prose; roles and labels (e.g. "Webentwicklung & AI"
→ "Web Development & AI"; imprint labels "Gründung/Inhaberin" → "Founded/Owner";
service items like "Mediastrategie" → "Media Strategy", "Politische Kampagnen" →
"Political Campaigns"). Tone: professional, idiomatic business/PR English
(transcreation, not literal).

**Source-defect handling (EN only; German source untouched):**
- The malformed `<stro ng>` tag in `privacy.md` is written correctly as `<strong>`
  in the English version.
- Source typos (e.g. "vostellte" in `projects/cases/1.md`) are rendered as the
  intended meaning in English.
- `privacy.md` legal text → professional legal English; "DSGVO" → "GDPR", article
  numbers kept ("Art. 15 et seq. GDPR").

## 4. Language switcher — `app/components/language-switcher.vue`

- Uses `useI18n()` (`locale`) + `useSwitchLocalePath()`.
- Renders "DE / EN": active locale highlighted and non-clickable; the other locale
  is a real `NuxtLink` to `switchLocalePath(<code>)` — stays on the same page,
  SEO-friendly, no JS state.
- Styled to match existing nav (font-medium; desktop `text-dark-grey` / hover
  `text-black`; mobile white on black).
- Integrated into `app/layouts/default.vue`: desktop nav (right side, after
  "About") and mobile menu (with the link list).

## 5. Correctness fix — `app/pages/projects/[slug].vue`

Add `{ watch: [() => locale.value] }` to the `useAsyncData` call (currently
missing, line ~98) so case detail pages refetch on language switch — consistent
with every other page. Required for the switcher to work on case pages.

## 6. Verification

Run `yarn dev`; in the browser check:
- `/` renders German, `/en` renders English.
- Each page type in EN: home, about, services index + 3 sub-pages, projects index,
  one project case detail, imprint, privacy.
- Switcher works on desktop and mobile, and stays on the equivalent page when
  toggling locale (including on a `[slug]` case page).
- No missing-i18n-key warnings in the console.

UI correctness is validated manually by the user before any commit/push.
