# Architecture

This document describes the technical architecture of the i-LANK prototype.

---

## Overview

i-LANK is a **single-page React application** rendered inside a fixed-size iPhone shell component. All navigation is handled through React state — there is no client-side router. This keeps the bundle small and the demo self-contained.

---

## Screen Management

### App.jsx — the router

`App.jsx` maintains a `currentScreen` integer index and an array of screen components:

```jsx
const screens = [
  SignUpScreen,         // 0
  LoginScreen,          // 1
  ForgotPasswordScreen, // 2
  EnterOtpScreen,       // 3
  ResetPasswordScreen,  // 4
  SuccessScreen,        // 5
  OnboardingScreen,     // 6
  HomeScreen,           // 7
];
```

Each screen receives a `goTo(index)` callback. The splash screen is an overlay controlled separately.

### HomeScreen — the overlay hub

`HomeScreen` is the most complex screen. It manages:

- **Phase state**: `'permission'` → `'map'`
- **Overlay state**: `showSigns`, `showGuide`, `showRatings`, `showPlanner`, `showProfile`
- **Active nav**: `activeNav` drives the highlighted bottom tab

Overlays are rendered as children of `.home` and use `position: absolute` to cover the parent. The `Overlay` wrapper component constrains overlays to `bottom: NAV_H` (72px) so the nav bar remains visible beneath them. `ProfileScreen` and `RoutePlanner` sit at higher `z-index` values (50 and 40 respectively) to cover the nav bar entirely.

---

## Styling Architecture

```
styles.scss          Global: variables, mixins, PhoneShell, status bar, home bar
home.scss            HomeScreen: map, location sheet, tooltip, nav bar
route-map.scss       RouteMapScreen: map overlay, top bar, badge, bottom sheet
rank-detail.scss     RankDetailScreen: photo, chips, safety tips, rating summary
rank-reviews.scss    RankReviewsScreen: reviews list, rating summary, rate form
signs.scss           SignsScreen + SignDetail: list, pro tip, detail sections
guide.scss           GuideScreen: featured card, tips, hand signals grid
ratings.scss         RatingsScreen: area selector, rank cards
profile.scss         ProfileScreen: user card, setting sections, toggles, danger rows
language.scss        LanguageScreen: radio list
```

### SCSS variable hierarchy

All screens import variables from their own file. The core palette is defined once in `styles.scss` and duplicated with `$green`, `$text`, `$muted`, `$white`, `$bg`, `$border` — consider extracting these to a `_variables.scss` partial for DRY refactoring.

---

## Asset Pipeline

Images are imported as ES modules so Vite can:
1. Hash the filename for cache busting
2. Copy them to `dist/assets/` at build time
3. Inline small SVGs as data URIs

```js
// ✅ Correct — Vite processes this
import bosmanImg from '../assets/images/Bosman_TR.png';

// ❌ Wrong — Vite never sees this path, 404 at runtime
const img = '../assets/images/Bosman_TR.png';
```

For dynamic asset references (e.g. when a path is constructed at runtime), use:
```js
new URL('../assets/images/Bosman_TR.png', import.meta.url).href
```

---

## Map Integration

Maps are embedded via OpenStreetMap's export iframe endpoint:

```
https://www.openstreetmap.org/export/embed.html?bbox=WEST,SOUTH,EAST,NORTH&layer=mapnik
```

`pointer-events: auto` on the iframe allows native pan/zoom. UI overlays (top bar, badge, bottom sheet) sit above the iframe at higher z-index values and intercept their own click events before they reach the iframe.

The SVG route line overlay uses `pointer-events: none` so map touches pass through it.

---

## Animation Patterns

### Screen transitions
All screens use the same pattern:
```scss
.screen {
  transform: translateX(100%);
  transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1);
  &--in { transform: translateX(0); }
}
```
A `requestAnimationFrame` in `useEffect` triggers the `--in` class one frame after mount, giving the browser time to paint the initial position before animating.

### Bottom sheets
```scss
.sheet {
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  &--in { transform: translateY(0); }
}
```

### Toggle switch
The thumb uses a `left` transition with `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring overshoot) for a physical feel.

---

## Known Limitations

| Limitation | Reason | Planned fix |
|---|---|---|
| No real GPS | Browser permissions not integrated | `navigator.geolocation` |
| Static rank data | No backend | REST API or Supabase |
| No auth persistence | No backend | JWT + localStorage |
| OSM iframe CORS | Embedded maps can't be queried | Leaflet.js or MapLibre GL |
| No PWA | No service worker | Vite PWA plugin |
