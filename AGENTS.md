# AGENTS.md — micalpacheco.com

Operating guide for AI agents and developers working on this project. Read this
before generating or changing UI. It encodes the **redesign** direction: a warm,
calm, trust-first psychiatric practice site — not the legacy dark "vCard" theme.

---

## 1. What this project is

A single-page marketing/landing site for **Mical Pacheco, MSN, APRN, PMHNP-BC** —
a board-certified Psychiatric Mental Health Nurse Practitioner in Broken Arrow,
Oklahoma. Bilingual (English / Spanish). Telehealth available.

**The site's one job:** help an anxious prospective patient feel safe enough to
take the next step (a call or a booking). Every change is judged against that.
It is *not* a résumé — credentials exist to reassure, not to impress.

Audience: adults seeking mental-health care (and their families), often stressed,
sometimes on mobile, frequently Spanish-speaking. Design for calm and clarity.

---

## 2. Source of truth

| Concern | File |
|---|---|
| Design tokens (color, type, spacing, radius, shadow, motion) | `redesign/css/tokens.css` |
| Component & layout styles | `redesign/css/app.css` |
| Markup + content structure | `redesign/index.html` |
| Behavior (i18n, nav, reveal) | `redesign/js/app.js` |
| Audit, rationale, roadmap | `redesign/Design Audit & Plan.html` |

**Always consume tokens.** Never hard-code a hex value, px font size, or ad-hoc
shadow in a component. If a value you need does not exist as a token, add it to
`tokens.css` first, then reference it.

---

## 3. Visual language (do this)

- **Mode:** light by default. Warm cream paper (`--paper`), ink text (`--ink`).
  Dark mode is optional and out of scope unless explicitly requested.
- **Color discipline:** exactly two brand hues — **sage** (`--sage*`, trust/clinical)
  and **clay** (`--clay*`, warmth/humanity). They share lightness & chroma in OKLCH
  and differ only in hue. Do **not** introduce teal, purple, coral, or gradients
  of many colors. The legacy 8-accent palette is retired.
- **Type:** `Newsreader` (serif) for headlines and display; `Hanken Grotesk` (sans)
  for UI, body, labels. Use the clamped scale (`--t-display` … `--t-xs`). Headlines
  weight 400 (the serif carries the weight). Body 16–17px minimum.
- **Shape & depth:** soft, warm, low-contrast shadows (`--sh-1`…`--sh-4`); radii
  from `--r-sm` to `--r-xl`. Surfaces are near-white cards on cream — keep clear
  figure/ground separation.
- **Spacing:** 4px base scale (`--s-1`…`--s-12`); fluid section padding via
  `--section-y`; max reading width `--maxw` (1160px). Prefer flex/grid + `gap`.
- **Motion:** subtle entrance reveals only; everything must respect
  `prefers-reduced-motion`. No infinite/looping decorative animation.

## 4. Anti-patterns (do NOT do this)

- ❌ Dark navy backgrounds or neon/cyan accents (the old theme).
- ❌ More than two accent hues; multi-color gradients; emoji as icons.
- ❌ Leading with GPA, license numbers, or job history like a CV.
- ❌ Empty placeholders shipped to production (e.g. the old blank map box).
- ❌ Icon-only interactive controls with no accessible label.
- ❌ Hard-coded colors/sizes that bypass `tokens.css`.
- ❌ Hand-drawn complex SVG illustrations; use simple line icons or real photography.

---

## 5. Accessibility (non-negotiable)

Target **WCAG 2.2 AA**.

- Body text contrast ≥ 4.5:1; large text ≥ 3:1. Verify any new color pairing.
- Visible focus on every interactive element (`:focus-visible`, `--focus` ring).
- Interactive targets ≥ 44×44px.
- Every control has a real text label or `aria-label`; decorative SVG gets
  `aria-hidden="true"`.
- Preserve landmarks (`header`, `main`, `footer`, `nav`), logical heading order,
  and the skip link.
- Honor `prefers-reduced-motion: reduce` (already wired globally).
- Keep the **911 / 988 crisis notice** present and prominent. Never remove it.

---

## 6. Content & copy rules

- Voice: warm, first-person, plain language. Reassure before you inform.
- Bilingual: every user-facing string lives in the `I18N` dictionary in
  `redesign/js/app.js` with both `en` and `es` keys. Add new copy to **both**
  languages and tag the element with `data-i18n="key"`. Spanish is a first-class
  language here, not an afterthought.
- Credentials are framed as reassurance (board-certified, licensed), not a transcript.
- Do not invent testimonials, insurance details, fees, or stats. Those are
  Phase 2 content the client provides — leave clearly marked TODOs instead.

---

## 7. Page structure (current)

`Header (sticky, CTA) → Hero (promise + portrait) → Trust strip → About + Education
→ How it works (3 steps) → Services (8) → Credentials (6) → Contact + Booking +
Crisis notice → Footer`

When adding a section, keep the single-CTA discipline: it should ultimately point
to "start a conversation" (call / book / message). Don't add competing actions.

---

## 8. Known facts (keep accurate)

- Name / title: **Mical Pacheco, MSN, APRN, PMHNP-BC** — Psychiatric Mental Health NP.
- Location: Broken Arrow / Tulsa area, Oklahoma. Telehealth statewide.
- Current position: **Choose Courage Counseling Services, PLLC** (2026–present).
- Phone: **(918) 417-2969** · Email: `mical.pacheco.pmhnp@gmail.com`.
- Credentials: PMHNP-BC (ANCC), APRN (Oklahoma), RN compact license, BLS/ACLS/CPR.
- Languages: English (native), Spanish (clinical/conversational).
- Education: MSN Saint Louis University (2025), BSN Northeastern State (2021),
  ADN Tulsa Community College (2016).

> If a fact conflicts with newer client input, the client is authoritative — update
> this list in the same change.

---

## 9. Definition of done for any UI change

1. Uses tokens; no stray hex/px/shadow.
2. Looks calm and on-brand (light, two-hue, serif+sans).
3. AA contrast + focus + 44px targets verified.
4. New strings added to **both** `en` and `es`.
5. Responsive at 360 / 768 / 1280px.
6. Reduced-motion respected; crisis notice intact.
