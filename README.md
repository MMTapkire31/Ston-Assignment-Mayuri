# STON Placement Platform - Student Mobile Module

React Native (Expo) student app, a mock Express API, and a GitHub Actions CI pipeline.

## Setup
```bash
   git clone https://github.com/MMTapkire31/Ston-Assignment-Mayuri.git
   cd Ston-Assignment-Mayuri
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
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/d14b2394-0fde-463c-9065-dfd3e9d4df09" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/f7e276e2-d096-4b60-82f5-cd939bfaa9d8" />
<img width="718" height="1599" alt="WhatsApp Image 2026-09-28 at 20 58 56" src="https://github.com/user-attachments/assets/e6e64245-400f-4217-9165-1f6198bfef30" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/8716a72c-9487-4f47-ba96-11990f626db3" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/0605829c-4b7a-41c1-b2a3-c085b87d6a6a" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/2ce84160-0769-46fe-8bdd-af3455e4e061" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/dd049201-1d52-499d-a006-eb37da92b25d" />
<img width="720" height="1604" alt="image" src="https://github.com/user-attachments/assets/50458bed-f15d-4602-aa14-ddb6c5fb68ee" />




