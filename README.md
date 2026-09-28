# STON Placement Platform - Student Mobile Module

React Native (Expo) student app, a mock Express API, and a GitHub Actions CI pipeline.

## Setup
```bash
git clone <your-repo-url> && cd ston-assignment-mayuri
npm install
```

## App
```bash
npx expo start        # scan the QR with Expo Go, or press "a" for Android
```
Demo login: roll number `21CS001`, password `student123`.

## Server
```bash
npm run server        # http://localhost:3000
```
Endpoints: `POST /api/auth/login`, `GET /api/drives`, `GET /api/drives/:id`,
`GET /api/drives/:id/eligibility`, `POST /api/drives/:id/apply`,
`GET /api/students/me/applications`, plus `GET /api/students/me`.
Protected routes need `Authorization: Bearer <token>` from the login response.

## Tests and lint
```bash
npx jest
npx eslint src/ --ext .js,.jsx
```

## Assumptions
- Shared state (applications) lives in a React Context so applying on the detail screen
  updates the list card and My Applications instantly. State resets when the app restarts.
- Eligibility is one pure function (`src/utils/eligibilityUtils.js`) checking drive status,
  then branch, then CGPA (equal to the minimum counts as eligible).
- Statuses use an icon plus a text label, never colour alone.
- Login navigates with `navigation.replace('Main')` so Back does not return to the login screen.
- The server keeps applications in memory (no database); restarting it resets them.
- The spec mentions 7 endpoints but tables 6; a 7th, `GET /api/students/me`, was added.
- Drive dates were moved to 2026 so they are not in the past.

## Screenshots
Still to do: add one per screen under `docs/screenshots/` and embed them here:
Login, Drive List, Drive Detail (eligible), Drive Detail (ineligible), My Applications, Admit Card.
