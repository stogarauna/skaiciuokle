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

- Upload an Excel file (`.xlsx/.xls`) in the app to populate LED panel models.
- Expected headers on the first sheet:
	- name, resX, resY, widthM, heightM, power, weightKg
- After upload, the panel selector will list the rows from the Excel.
- To use: open the app, click the upload control, choose your Excel file.
