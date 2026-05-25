# EliteSignal — Sniper Intelligence UI + Backend

> Local prototype for the EliteSignal interface (React + Vite) and a minimal FastAPI backend.

Summary
- Frontend: React + TypeScript + Vite + TailwindCSS. Interactive login/signup UI and a rich 'Terminal' dashboard.
- Backend: FastAPI prototype (single-file `main.py`) with simple auth, a signal analysis endpoint and API-key vault stubs.

Quick start (frontend)

1. Install dependencies

```bash
cd /workspaces/Elite-Signals
npm install
```

2. Run dev server

```bash
npm run dev
# open http://localhost:5173
```

Termux build on Android

This repository can be built inside Termux on Android for the frontend UI and a local FastAPI backend prototype. The commands below assume a working Termux environment and Android storage permissions if you clone outside Termux's home directory.

Quick Termux command list

```bash
pkg update && pkg upgrade -y
pkg install git nodejs python
cd ~/storage/shared
git clone https://github.com/manierkendall-svg/Elite-Signals.git
cd Elite-Signals
npm install
npm run build
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Full Termux build guide

1. Install Termux from F-Droid, then open it.
2. Update Termux packages:

```bash
pkg update && pkg upgrade -y
```

3. Install required tooling:

```bash
pkg install git nodejs python
```

If `nodejs` is unavailable, try `pkg install nodejs-lts`.

4. Clone this repository into Termux home or Android shared storage:

```bash
cd ~
git clone https://github.com/manierkendall-svg/Elite-Signals.git
cd Elite-Signals
```

If you prefer Android shared storage, grant storage access with `termux-setup-storage` first and then use `cd ~/storage/shared`.

5. Install frontend dependencies and build the app:

```bash
npm install
npm run build
```

This produces the static frontend output in `dist`.

6. (Optional) Set up the backend environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

`requirements.txt` includes FastAPI, Uvicorn, SQLAlchemy, passlib, python-jose, and related backend dependencies.

7. Run the local FastAPI backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://127.0.0.1:8000` and the frontend build output is in `dist`.

Notes for Termux

- Termux runs on Android and may require `termux-setup-storage` for shared storage access.
- If `npm install` fails, ensure `nodejs` is installed and use `npm cache clean --force` before retrying.
- For backend usage, `psycopg2-binary` may have platform-specific limitations on Android. If you only need the local prototype, the backend can run with SQLite without Postgres.

Vercel deployment (recommended)

This repo is ready for Vercel because it is a Vite frontend app that builds into `dist`.

Exact Vercel import steps

1. Visit `https://vercel.com`.
2. Click **Log in** and choose **GitHub**.
   - Question: “Which Git provider do you want to use?”
   - Answer: **GitHub**
3. Authorize Vercel to access your GitHub account.
   - Question: “Allow Vercel to access your repositories?”
   - Answer: **Allow access**
4. Click **New Project**.
5. On **Import Project**, choose the repository:
   - `manierkendall-svg/Elite-Signals`
6. On **Configure Project**, enter these values:

| Field | Value |
|---|---|
| Project Name | `Elite-Signals` (or your preferred name) |
| Root Directory | leave blank or `/` |
| Framework Preset | `Vite` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

7. Add environment variables in the same page or later in Project Settings:
   - Name: `VITE_API_URL`
   - Value: `https://your-backend.example.com`
   - Environment: `Production` (and optionally `Preview` / `Development` if you want the same value everywhere)
8. Click **Deploy**.
   - Question: “Ready to Deploy?”
   - Answer: **Deploy**
9. Wait for the build logs to complete.
   - Vercel will run `npm install`, then `npm run build`.
   - You should see: **Build Completed**
10. Open the generated deployment URL.

If you use a separate backend host, set `VITE_API_URL` to the backend URL. The frontend now resolves backend requests with `VITE_API_URL` and will fall back to the current site origin if the variable is not set.

If Vercel does not auto-detect Vite, choose the preset manually:
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

Vercel CLI deployment

If you prefer to deploy from the command line, install the Vercel CLI and answer the prompts exactly as shown:

```bash
npm install -g vercel
cd /workspaces/Elite-Signals
vercel login
vercel
```

Example Vercel CLI prompt flow:
- “Set up and deploy `Elite-Signals`?”
  - Answer: `y`
- “Which scope should it belong to?”
  - Answer: your GitHub username or team name
- “Link to existing project?”
  - Answer: `y` if you already imported it, otherwise `n`
- “Which directory is your code located in?”
  - Answer: `.`
- “What's your build command?”
  - Answer: `npm run build`
- “What's your output directory?”
  - Answer: `dist`
- “Want to override the settings?”
  - Answer: `n`

If you need to set environment variables in the CLI deploy, use:

```bash
vercel env add VITE_API_URL production
```

Then enter:
- `https://your-backend.example.com`

Vercel project settings checklist

- **Git Branch**: `main`
- **Automatically expose system environment variables**: enabled by default
- **Environment Variables**:
  - `VITE_API_URL` = `https://your-backend.example.com`
- **Root Directory**: `/`
- **Build & Output Settings**: use the values above

> Note: This deploys only the frontend UI. The FastAPI backend in `main.py` must be hosted separately, and the frontend will call it using `VITE_API_URL`.

GitHub Actions build

- This repo includes a GitHub Actions workflow at `.github/workflows/build-frontend.yml`.
- The workflow runs on pushes and pull requests to `main`, installs dependencies, builds the Vite app, and uploads the `dist` folder as an artifact.
- Use this for automatic CI builds even if you do not connect to Vercel.

Android APK build

- A second workflow is available at `.github/workflows/build-android-apk.yml`.
- It installs Capacitor, initializes an Android project, syncs the built web assets, and builds a release APK.
- After the workflow succeeds, the APK artifact is uploaded as `elite-signal-android-apk`.

Vercel step

- You do not need to run the build locally to deploy to Vercel. Vercel will build the repo automatically after you connect it.
- The only action required from you is to sign in to Vercel and link this GitHub repository.
- After the first deploy, Vercel will redeploy on every push to your connected branch.

APK / AAB via CI (future)

- This repo currently builds the web app for deployment and produces a `dist` artifact.
- To turn it into a true Android APK/AAB, the next step is to add Capacitor or a TWA wrapper and Android SDK build actions.
- I can help you add that when you are ready, but the current setup already prepares the frontend build and Vercel hosting.

PWA installable app

- The frontend now includes a basic `manifest.json` and service worker stub.
- After deployment, open the site in Chrome and use “Add to Home screen” to install the app.
- The PWA gives the site a more app-like experience on Android.

Quick start (backend)

1. Create a virtualenv and install runtime deps

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install fastapi uvicorn sqlalchemy passlib[bcrypt] python-jose[cryptography] python-multipart
```

2. Run the API server

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
# or: python main.py
```

Important files
- `App.tsx` — router and routes for `/login`, `/signup`, `/terminal`.
- `LoginPage.tsx`, `SignupPage.tsx`, `TerminalPage.tsx` — UI pages (present in repo root).
- `main.py` — FastAPI prototype and example endpoints (`/token`, `/api/signals/analyze`, `/api/vault/keys`).
- `package.json` — frontend scripts (`dev`, `build`, `preview`) and dependencies.

Notes & developer TODOs
- Default / example credentials and secrets are hard-coded in the prototype:
  - Frontend login form checks for: `admin@elitesignal.ai` / `EliteSniper_2026_Access` (client-side stub).
  - Backend token endpoint accepts: `admin_master` / `EliteSniper_2026_Access` and uses `SECRET_KEY = "ELITE_SNIPER_SECRET_QUANTUM_KEY"` in `main.py`.
  - Rotate and remove these values before any public deployment.
- Import paths: `App.tsx` imports `./pages/LoginPage` and `./pages/SignupPage` but the files in this workspace are at the project root (`LoginPage.tsx`, `SignupPage.tsx`). Either move the page files into a `pages/` folder or update the imports in `App.tsx`.
- Backend DB: `main.py` defaults to SQLite at `./elitesignal.db` when `DATABASE_URL` is not set. For production, provide a Postgres URL via `DATABASE_URL` env var.
- API keys & models: endpoints and database models are stubs — add secure storage and input validation before storing keys or accepting uploads.

Security
- Remove hard-coded secrets and admin passwords. Use environment variables (e.g. `SECRET_KEY`, `DATABASE_URL`) and a secure secrets manager.
- Do not check-in real API keys or models into git. Use the API vault endpoints as an integration point only after implementing encryption-at-rest and access controls.

Project structure (top-level)

```
App.tsx
LoginPage.tsx
SignupPage.tsx
TerminalPage.tsx
main.py
package.json
vite.config.ts
index.html
public/manifest.json
public/sw.js
vercel.json
```

Contributing
- Open a PR for UI improvements, separate frontend code under `src/` and move pages into `src/pages/`.

License
- Add a LICENSE file or header if you intend to publish or share this project.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
