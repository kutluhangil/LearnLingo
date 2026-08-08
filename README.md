<div align="center">

<img src=".github/readme/goit-logo.png" alt="GoIT" width="220" />

<br />

# LearnLingo

**Online language tutoring platform — teacher catalog, Firebase auth, favorites and trial lesson booking.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-learnlingo--nu.vercel.app-181818?style=for-the-badge&logo=vercel&logoColor=white)](https://learnlingo-nu.vercel.app)
&nbsp;
[![GoIT](https://img.shields.io/badge/GoIT-Frontend_Course-FF5C00?style=for-the-badge)](https://goit.global/tr/)

<br />

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Yup](https://img.shields.io/badge/Yup-validation-2D3748?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)

</div>

<br />

## Overview

LearnLingo is the frontend for an online language-tutoring company. Visitors browse the teacher
catalog, narrow it down with filters, save favorites across sessions, read student reviews and
book a trial lesson — all built as a course project for the
[GoIT](https://goit.global/tr/) Frontend Development program.

The UI follows the Figma-based mockup supplied with the assignment (`Learn Lingo/` folder in this
repo).

<br />

## Live Demo

| | |
| --- | --- |
| **Production** | [learnlingo-nu.vercel.app](https://learnlingo-nu.vercel.app) |
| **Repository** | [github.com/kutluhangil/LearnLingo](https://github.com/kutluhangil/LearnLingo) |

<br />

## Features

- **Home page** — hero with a "Get started" call to action and a stats section, matching the
  supplied mockup.
- **Teachers catalog** — cards with avatar, languages, rating, lessons done, price and CEFR level
  badges; "Read more" expands the card with the tutor's bio and student reviews.
- **Filtering** — language, level of knowledge and price per hour, resolved against the loaded
  teacher set.
- **Pagination** — "Load more" re-queries Firebase Realtime Database for the next batch of
  teachers.
- **Favorites** — toggled from any card, persisted to `localStorage`, restored on reload; guests
  are prompted to log in first.
- **Authentication** — email/password registration and login via Firebase Auth, with
  react-hook-form + yup validation and session persistence across reloads.
- **Trial lesson booking** — a modal form (reason, name, email, phone) that writes the request to
  Firebase Realtime Database.
- **Modals** — Login, Registration and Book Trial Lesson all close via the close icon, a backdrop
  click or the Esc key.

<br />

## Tech Stack

| Layer | Choice |
| --- | --- |
| Build tool | Vite |
| UI library | React 19 |
| Routing | React Router 7 |
| Forms & validation | React Hook Form + Yup |
| Auth & database | Firebase Authentication + Realtime Database |
| Styling | Tailwind CSS 4 |
| Deployment | Vercel |

<br />

## Backend

Data is served from a Firebase Realtime Database instance:

```
GET  /teachers.json          # teacher catalog (name, languages, levels, price, reviews, ...)
POST /trialBookings.json     # trial lesson booking requests
```

Authentication (registration, login, session, logout) runs through Firebase Authentication's
email/password provider.

<br />

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/teachers` | Teacher catalog with filters |
| `/favorites` | Favorited teachers (requires login) |
| `*` | Not found |

<br />

## Getting Started

Requires Node.js 20 or newer and a Firebase project (Authentication + Realtime Database enabled).

```bash
npm install                # install dependencies
cp .env.example .env       # fill in your Firebase project config
node scripts/seedTeachers.mjs   # seed the teachers collection from teachers.json
npm run dev                # start the dev server on http://localhost:5173
npm run build               # production build into dist/
npm run preview             # preview the production build
npm run lint                 # lint the source
```

<br />

## Project Structure

```
src/
├── components/    UI components (Header, Modal, TeacherCard, filter bar, auth modals, ...)
├── pages/         route-level components (Home, Teachers, Favorites, NotFound)
├── context/       AuthContext — Firebase auth state provider
├── hooks/         useFavorites — localStorage-backed favorites
├── lib/           firebase client, teachers data layer, yup validation schemas
└── assets/        images and icons
```

<br />

## Author

**Kutluhan Gil**
[GitHub](https://github.com/kutluhangil)

Built as part of the [GoIT](https://goit.global/tr/) Frontend Development program.

<div align="center">

<sub>MIT Licensed — see <a href="LICENSE">LICENSE</a></sub>

</div>
