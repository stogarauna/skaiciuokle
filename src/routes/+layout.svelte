<script>
	import { onMount } from 'svelte';
	import { panelsData } from '$lib/stores';
	import { parsePanelsExcel } from '$lib/utils/excelLoader.js';

	// footer shows static version string to avoid importing package.json (which breaks Vite FS allow)
		const version = '2.1.0';
	// If you want to wire this dynamically later, expose VITE_APP_VERSION via env and read import.meta.env.VITE_APP_VERSION

	// Preload panels.xlsx from static if present
	onMount(async () => {
		try {
			const res = await fetch('/panels.xlsx');
			if (!res.ok) return;
			const buf = await res.arrayBuffer();
			const parsed = await parsePanelsExcel(buf);
			if (Array.isArray(parsed) && parsed.length > 0) {
				panelsData.set(parsed);
			}
		} catch (err) {
			// ignore if not available
		}
	});
</script>

<!-- Navigation removed by request -->

<main class="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-6" style="font-size: 1.8rem !important; line-height: 1 !important;">
	<div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-5">
		<slot />
	</div>

	<footer class="text-center text-gray-500 mt-6">
		<a href="/extra" class="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Extra</a>
		<div class="mt-2">LED Skaičiuoklė © 2026 · v{version}</div>
	</footer>
</main>
