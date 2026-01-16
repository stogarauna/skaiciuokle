# skaiciuokle — v2

[Live site](https://skaiciuokle-topaz.vercel.app) · [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository=https://github.com/stogarauna/skaiciuokle)

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Excel Data Import (Panels)

	- name, resX, resY, widthM, heightM, power, weightKg

## CI/CD — Auto Deploys (GitHub ↔ Vercel)

- Adapter: Uses `@sveltejs/adapter-vercel` in [svelte.config.js](svelte.config.js).
- Workflows: 
	- CI checks: [./.github/workflows/ci.yml](.github/workflows/ci.yml)
	- Prod deploy on push to `main`: [./.github/workflows/deploy.yml](.github/workflows/deploy.yml)
	- Preview deploys on PRs: [./.github/workflows/preview.yml](.github/workflows/preview.yml)

### Option A — Vercel Git Integration (recommended)
- In Vercel Dashboard: New Project → Import GitHub → select `stogarauna/skaiciuokle`.
- Framework preset: SvelteKit. Build command: `npm run build`. Output: `.vercel/output`.
- Every push to `main` auto-deploys; PRs get preview deployments.

### Option B — GitHub Actions + Vercel CLI
Add these GitHub repository secrets (Settings → Secrets and variables → Actions):
- `VERCEL_TOKEN`: Vercel Account → Tokens
- `VERCEL_ORG_ID`: From `.vercel/project.json` or Vercel dashboard
- `VERCEL_PROJECT_ID`: From `.vercel/project.json` or Vercel dashboard

Then pushes to `main` will run `vercel pull`, `vercel build`, and `vercel deploy --prebuilt --prod` automatically.
Pull requests will deploy non-prod previews.

