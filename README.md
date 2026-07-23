# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 2 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/intake.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `Stuart White fitness coaching website` project files (HTML prototypes, assets, components)

## Environment variables

Set these in the Netlify dashboard (Site configuration → Environment variables). See `.env.example` for local reference; never commit a real `.env` file.

| Variable | Used by | Notes |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | `netlify/functions/create-subscription.js` | Server-side only, never exposed to the browser. Live key in production, test key (`sk_test_...`) when testing locally. |

The Stripe publishable key and Price ID are not secrets and are hardcoded in `src/lib/site-config.ts`.

## Signup paths

There are two intake routes, both rendering the shared `src/components/IntakeWizard.astro` wizard so they can't drift apart:

- `/intake` — the public path, linked from the site. 7-day free trial, plan key `standard`.
- `/start/founding` — an unlisted path, never linked from the site and excluded from the sitemap (`src/pages/sitemap.xml.ts`) and `robots.txt`. 28-day free trial, plan key `founding`. Share this URL privately.

Both card-collection and the trial length are handled by `netlify/functions/create-subscription.js`, which maps the plan key to a trial length via a hardcoded table (`PLAN_TRIALS`) and rejects any unrecognised plan key with a 400. It never accepts a trial length from the client. The created subscription's metadata carries `trial_variant: "7day"` or `"28day"` for later segmentation in Stripe.
