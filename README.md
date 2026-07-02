# Winston v2 Faithful Build

This build uses the old Winston HTML as the source of truth and applies visual/readability upgrades on top.

What changed:
- Removed the concept-build placeholder scoring problem by using old Winston as the base.
- Preserved old conversation logic, Chart.js graphs, misallocation tabs, sources, case-study pages, and thesis trace.
- Added cleaner dark-blue/gold visual system, mouse-reactive ambient background, larger text, stronger yellow section labels, redesigned case buttons, and mobile readability fixes.
- Added instruction in Winston's prompt to avoid invented scores, live-data claims, citations, API access, or case facts.

Deployment:
Upload the contents of this folder to the root of the test repo. The repo root should show `index.html` directly.

Note:
This does not restore API keys or external services by itself. If the previous live site depended on Netlify functions/API keys for Claude, S&P, Moody's, or live FX data, those functions and environment variables must also exist in the deployed repo/site settings.
