---
target: CV website landing page
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 3
target_identity: "file:/Users/paulpop/Desktop/PersonalProject/iampaulpop/src/show/pages/public/LandingPage/index.tsx"
target_fingerprint: "sha256:5c5c6443ff79cfae60bdb3b9d4d290ffb34653f1629417a813dd28adab631807"
target_path: /Users/paulpop/Desktop/PersonalProject/iampaulpop/src/show/pages/public/LandingPage/index.tsx
timestamp: 2026-10-22T21-09-01Z
slug: src-show-pages-public-landingpage-index-tsx
---
Method: dual-agent (A: design review · B: detector + browser)

## Heuristics (20/32, H7 & H10 n/a)
1 Status 3 · 2 Real world 2 · 3 Control 3 · 4 Consistency 2 · 5 Error prevention 3 · 6 Recognition 3 · 7 n/a · 8 Minimalism 2 · 9 Error recovery 2 · 10 n/a

## Design specificity
Category-interchangeable "Brittany Chiang" dev-portfolio template: mono greeting, numbered "01." headings, ▹ bullets, logo-chip wall, CV button at the end. Only palette, mono type and the hobbies line feel personal. Strongest differentiator (GIS platforms for Romanian public institutions) buried as a bullet.
Detector: source scan 0 findings (regex-only on tsx). Browser overlay light mode: 7 low-contrast (primary #fdc700 on #f6f5f4 1.4:1; muted #737373 4.4:1). Dark mode clean. URL scans: 6 advisory stragglers/unbalanced heading.

## Priority issues
- [P0] Light-mode accent text 1.45:1 (logo, greeting, section numbers, @Company, CTA, footer links); muted 4.35:1. Fix: dark amber text-accent token for light mode; muted ~oklch(0.45). colorize/audit
- [P1] A11y: project cards not keyboard-reachable (div onClick); nav aria-label = raw i18n keys; language + mobile menu buttons unnamed; back-to-top is a div; footer alt "[object Object] logo"; weak focus ring; no reduced-motion. harden
- [P1] Conversion path backwards: CV/contact/LinkedIn only at the bottom; no location/seniority/availability above the fold. clarify/layout
- [P1] Credibility: "3+ years" vs Luminos from Jun 2022; QA role overlap unexplained; leadership claim unsupported; bullets without outcomes. clarify
- [P2] Rhythm: 100dvh hero half empty, ~370px gaps, 30-chip skills wall (1700px mobile), project screenshots hover-only via microlink with no fallback. layout/distill

## Personas
Recruiter on mobile: coffee joke + empty space first, CV ~6800px down. Eng lead: no outcomes/numbers/code, projects as feature lists. Keyboard/SR: cannot open projects, "general:about", unnamed buttons.

## Minor
dayjs not localized (RO shows "Jun 2025"); tags read as one phrase; "->" text arrow; negative --radius-sm calc; scroll listener re-renders App; Projects extra px-6 misalignment; text-wrap pretty/balance.

## Stand out ideas
1 Specific hero + fact strip + CV/email/LinkedIn CTAs. 2 Case studies for invitatio & Vanilla (problem, role, hard decision, result, real screenshots). 3 Sanitized GIS mini-demo (MapLibre). 4 Motorsport/telemetry design language + Strava ticker. 5 Visible RO/EN toggle + colophon. 6 Skills with depth (daily/production/exploring). 7 ?for=company tailored link + print CV stylesheet. 8 ⌘K command palette.
