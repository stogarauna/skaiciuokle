# skaiciuokle — v2
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

## Deploy (Vercel + GitHub)

- Adapter: The project uses `@sveltejs/adapter-vercel` in [svelte.config.js](svelte.config.js).
- GitHub: Push to `main` triggers Vercel deployment when the repo is connected.
- Connect on Vercel:
	- New Project → Import Git Repository → select your repo.
	- Framework auto-detect: SvelteKit. Build: `npm run build`.
- CLI (optional):

```bash
npm i -D vercel
npx vercel
npx vercel --prod
```

- Extra link: The footer contains a link to the Extra page for quick access.
