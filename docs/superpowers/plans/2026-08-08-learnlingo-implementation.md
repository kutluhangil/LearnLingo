# LearnLingo Implementation Plan

> Executed inline in the same session that wrote this plan (full spec context retained) — using superpowers:executing-plans approach, no subagent handoff needed.

**Goal:** Build the 3-page LearnLingo app (Home, Teachers, Favorites) pixel-matching `Learn Lingo/` mockups, backed by Firebase Auth + Realtime Database, deployed to Vercel.

**Architecture:** Vite + React 19 SPA, React Router v6 for routing, Tailwind CSS v4 for styling, Firebase modular SDK (Auth + Realtime Database) via a single `src/lib/firebase.js` client, React Context for auth state, a `useFavorites` hook backed by localStorage.

**Tech Stack:** react, react-dom, react-router-dom, react-hook-form, yup, @hookform/resolvers, firebase, tailwindcss v4 + @tailwindcss/vite.

## Global Constraints

- All fields in Registration/Login/Book-trial forms are required (react-hook-form + yup validation).
- Modals close via X icon, backdrop click, or Esc key.
- Teachers page shows 4 cards initially; Load More re-queries Firebase for more.
- Heart click: unauthenticated → modal/notice; authenticated → toggle favorite + persist across refresh.
- No console errors. No code comments unless a non-obvious WHY exists. No AI-attribution anywhere (commits, README, code).
- Design must match `Learn Lingo/*.png` mockups (primary yellow `#F4C550`).

---

## Firebase project (already provisioned)

- Project: `learnlingo-6fc66`, Auth (Email/Password) enabled, Realtime Database created in test mode.
- Config stored in `.env` (gitignored), exposed via `VITE_FIREBASE_*` vars, consumed by `src/lib/firebase.js`.

## Task 1: Tailwind setup + design tokens

**Files:**
- Modify: `vite.config.js` (add `@tailwindcss/vite` plugin)
- Create: `src/index.css` (Tailwind import + `@theme` tokens: brand yellow `#F4C550`, ink `#121417` etc.)
- Modify: `src/main.jsx` (import `./index.css` instead of old CSS files)
- Delete: `src/App.css`, `src/index.css` (old CRA-style files if present), `src/assets/react.svg` (unused)

Deliverable: `npm run dev` renders a blank page styled by Tailwind, no console errors.

## Task 2: Firebase client + env

**Files:**
- Create: `.env` (real values, gitignored)
- Create: `.env.example` (placeholder keys, committed)
- Create: `src/lib/firebase.js` — exports `app`, `auth`, `db`
- Modify: `.gitignore` (confirm `.env` present)

## Task 3: Auth context + hooks

**Files:**
- Create: `src/context/AuthContext.jsx` — `AuthProvider`, `useAuth()` exposing `{ user, loading, register(name,email,password), login(email,password), logout() }`
- Uses `onAuthStateChanged`, `createUserWithEmailAndPassword` + `updateProfile`, `signInWithEmailAndPassword`, `signOut` from `firebase/auth`.

## Task 4: Generic Modal component

**Files:**
- Create: `src/components/Modal.jsx` — props `{ isOpen, onClose, children, labelledBy }`; closes on backdrop click, X button, Escape key; locks `document.body` scroll while open; uses a portal to `document.body`.

## Task 5: Favorites hook

**Files:**
- Create: `src/hooks/useFavorites.js` — reads/writes `localStorage["learnlingo_favorites"]` (array of teacher ids), exposes `{ favorites, isFavorite(id), toggleFavorite(id) }`, syncs across tabs via `storage` event.

## Task 6: Teachers data layer

**Files:**
- Create: `src/lib/teachers.js` — `fetchTeachers(limit)` using Firebase RTDB `query(ref(db,'teachers'), orderByKey(), limitToFirst(limit))`, returns array of `{ id, ...data }`.
- Create: `scripts/seedTeachers.mjs` — Node script, reads `teachers.json`, PUTs to `${VITE_FIREBASE_DATABASE_URL}/teachers.json` via REST (`fetch`), run once manually.

## Task 7: Header + Layout

**Files:**
- Create: `src/components/Header.jsx` — logo, nav (Home/Teachers/+Favorites if authed), Log in / Registration or user-name + Log out, opens Login/Registration modals.
- Create: `src/components/Layout.jsx` — Header + `<Outlet/>` + Footer.
- Create: `src/components/Footer.jsx` — minimal footer matching mockup absence (keep unobtrusive, small copyright line).

## Task 8: Auth modals (Login / Registration)

**Files:**
- Create: `src/components/auth/LoginModal.jsx` — react-hook-form + yup (email, password required), calls `useAuth().login`, shows Firebase error message on failure.
- Create: `src/components/auth/RegisterModal.jsx` — react-hook-form + yup (name, email, password required), calls `useAuth().register`.
- Create: `src/lib/validation.js` — shared yup schemas (`loginSchema`, `registerSchema`, `bookTrialSchema`).

## Task 9: Home page

**Files:**
- Create: `src/pages/Home.jsx` — Hero section (headline, CTA "Get started" → navigates to `/teachers`, opens Registration modal first if guest), stats bar, matching `Learn Lingo/Learn Lingo.png`.
- Create: `src/components/Hero3D.jsx` — decorative image block (CSS-recreated avatar/laptop block from mockup, no external asset dependency beyond a placeholder image if needed).

## Task 10: TeacherCard component

**Files:**
- Create: `src/components/TeacherCard.jsx` — compact card (avatar, name, languages, lessons done, rating, price, heart button, level chips, "Read more" toggle) + expanded state (experience paragraph, reviews list, "Book trial lesson" button opening `BookTrialModal`).
- Create: `src/components/FavoriteButton.jsx` — wraps `useFavorites` + `useAuth`; guest click opens a small "login required" modal/toast.

## Task 11: Book trial modal

**Files:**
- Create: `src/components/BookTrialModal.jsx` — teacher summary header, radio group (5 reasons), Full Name/Email/Phone fields, react-hook-form + yup, all required.

## Task 12: Teacher filter bar

**Files:**
- Create: `src/components/TeacherFilterBar.jsx` — 3 selects (language, level, price), derives option lists from the loaded teacher set, calls `onChange(filters)`.

## Task 13: Teachers page

**Files:**
- Create: `src/pages/Teachers.jsx` — fetches via `fetchTeachers(visibleCount)`, applies filters client-side, renders `TeacherFilterBar` + `TeacherCard[]` + Load More button (increments `visibleCount` by 4, re-fetches).

## Task 14: Favorites page + route guard

**Files:**
- Create: `src/components/PrivateRoute.jsx` — redirects to `/` if `!user` (after `loading` resolves).
- Create: `src/pages/Favorites.jsx` — fetches full teacher set once, filters by `useFavorites().favorites`, renders same `TeacherCard` grid, no filter bar/load-more.

## Task 15: Routing + App shell

**Files:**
- Modify: `src/App.jsx` — `BrowserRouter` > `AuthProvider` > `Routes`: `/` Home, `/teachers` Teachers, `/favorites` Favorites (guarded), `*` simple 404.
- Modify: `src/main.jsx` — mounts `App`.

## Task 16: README + CHANGELOG + polish

**Files:**
- Create: `README.md` (project topic, stack, mockup reference, spec reference, setup/run instructions) — per global CLAUDE.md rule, no AI mention.
- Create: `CHANGELOG.md` — one-line entries per feature added.
- Verify: `npm run build` succeeds, `npm run lint` clean, manual browser walkthrough (Home→Teachers→filter→Load more→Read more→Book trial→Register→Login→favorite toggle→refresh persistence→Favorites page→logout).

## Task 17: Deploy to Vercel

- Push repo, connect via Vercel MCP, set env vars (`VITE_FIREBASE_*`) in Vercel project, deploy, verify live URL.

---

## Self-review notes

- Spec coverage: Home/Teachers/Favorites pages ✓ (Tasks 9,13,14); Firebase auth ✓ (Task 3,8); react-hook-form+yup on both forms + book-trial ✓ (Tasks 8,11); modal close behavior ✓ (Task 4); teachers collection seed ✓ (Task 6); card design ✓ (Task 10); 4 cards + Load more re-query ✓ (Task 13); heart guest/auth behavior ✓ (Task 10 FavoriteButton, Task 5); persistence across refresh ✓ (Task 5 localStorage); remove from favorites ✓ (Task 5 toggle); Read more expand ✓ (Task 10); Book trial modal ✓ (Task 11); Favorites page same styling ✓ (Task 14); React Router ✓ (Task 15); filtering ✓ (Task 12); README/CHANGELOG/deploy ✓ (Task 16,17).
