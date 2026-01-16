## Changelog

### v2.1.0 – 2026-01-16
- Replace hardcoded `src/lib/data/panels.js` with Excel import.
- Add upload control on Home and Extra pages to load panel models from `.xlsx`.
- Introduce `panelsData` store to hold parsed models.
- Dependency: add `xlsx` (SheetJS) for client-side parsing.

### v2.0.1 – 2025-12-03
- Main: Total Pixels now shows dynamic note “More than N port(s)” with red highlight when thresholds are exceeded (N = floor(totalPixels / 782,000)).
- Extra: same dynamic note applied to Total pixels in the model card.
- Footer: show app version (v2.0.1) to verify builds on devices.
- Fix: removed package.json import from layout (caused Vite FS allow error), replaced with static version string.

### v2.0.0 – 2025-12-03
- Reordered Extra page layout per request (model info and limits order).
- Added “Ports needed” metric (ceil(totalPixels / perPortPixelBudget)).
- Highlight Total Pixels >= 782,000 with a red color and note.
- Removed header navigation (Home/Extra) from layout.
- General UI and calculation improvements.
