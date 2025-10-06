<script>
	import { panels } from "../lib/data/panels.js";

	let selected = panels[0];
	let width = 5;
	let height = 3;

	// derived values
	$: totalPanels = width * height;

	// total resolution
	$: totalWidthPx = width * selected.resX;
	$: totalHeightPx = height * selected.resY;
	$: resolutionText = `${totalWidthPx} × ${totalHeightPx}`;

	// aspect ratio
	function gcd(a, b) {
		return b === 0 ? a : gcd(b, a % b);
	}
	$: ratioGCD = gcd(totalWidthPx, totalHeightPx);
	$: aspectRatio = `${(totalWidthPx / ratioGCD).toFixed(0)} : ${(totalHeightPx / ratioGCD).toFixed(0)}`;

	// total pixels
	$: totalPixels = totalWidthPx * totalHeightPx;

	// physical dimensions
	$: totalWidthM = width * selected.widthM;
	$: totalHeightM = height * selected.heightM;
	$: totalArea = totalWidthM * totalHeightM;

	// power and weight
	$: totalPower = totalPanels * selected.power;
	$: totalWeight = totalPanels * selected.weightKg;

	// smart formatting
	$: powerDisplay =
		totalPower >= 1000
			? `${(totalPower / 1000).toFixed(2)} kW`
			: `${totalPower.toFixed(0)} W`;

	$: weightDisplay =
		totalWeight >= 1000
			? `${(totalWeight / 1000).toFixed(2)} t`
			: `${totalWeight.toFixed(1)} kg`;
</script>

<section class="space-y-5">
	<!-- Panel selector -->
	<div class="bg-white p-5 rounded-2xl shadow-md">
		<label for="panelSelect" class="block mb-2 text-sm font-semibold text-gray-700">
			LED Panel Type
		</label>
		<select
			id="panelSelect"
			bind:value={selected}
			class="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
		>
			{#each panels as panel}
				<option value={panel}>{panel.name}</option>
			{/each}
		</select>
	</div>

	<!-- Size inputs -->
	<div class="bg-white p-5 rounded-2xl shadow-md grid grid-cols-2 gap-4">
		<div>
			<label for="widthInput" class="block mb-1 text-sm font-semibold text-gray-700">
				Width (panels)
			</label>
			<div class="flex items-center gap-2">
				<button type="button" aria-label="Decrease width" class="w-10 h-10 rounded-full bg-gray-200 text-2xl flex items-center justify-center select-none active:bg-gray-300" on:click={() => width = Math.max(1, width - 1)}>-</button>
				<input
					id="widthInput"
					type="number"
					min="1"
					bind:value={width}
					on:input={e => width = Math.max(1, parseInt(e.target.value) || 1)}
					class="w-20 border border-gray-300 rounded-xl p-3 text-center text-lg focus:ring-2 focus:ring-blue-500"
				/>
				<button type="button" aria-label="Increase width" class="w-10 h-10 rounded-full bg-gray-200 text-2xl flex items-center justify-center select-none active:bg-gray-300" on:click={() => width = width + 1}>+</button>
			</div>
		</div>

		<div>
			<label for="heightInput" class="block mb-1 text-sm font-semibold text-gray-700">
				Height (panels)
			</label>
			<div class="flex items-center gap-2">
				<button type="button" aria-label="Decrease height" class="w-10 h-10 rounded-full bg-gray-200 text-2xl flex items-center justify-center select-none active:bg-gray-300" on:click={() => height = Math.max(1, height - 1)}>-</button>
				<input
					id="heightInput"
					type="number"
					min="1"
					bind:value={height}
					on:input={e => height = Math.max(1, parseInt(e.target.value) || 1)}
					class="w-20 border border-gray-300 rounded-xl p-3 text-center text-lg focus:ring-2 focus:ring-blue-500"
				/>
				<button type="button" aria-label="Increase height" class="w-10 h-10 rounded-full bg-gray-200 text-2xl flex items-center justify-center select-none active:bg-gray-300" on:click={() => height = height + 1}>+</button>
			</div>
		</div>
	</div>

	<!-- Results -->
	<div class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-2xl shadow-md space-y-2">
		<p class="text-lg"><strong>Total Panels:</strong> {totalPanels}</p>
		<p class="text-lg"><strong>Resolution:</strong> {resolutionText}</p>
		<p class="text-lg"><strong>Aspect Ratio:</strong> {aspectRatio}</p>
		<p class="text-lg"><strong>Total Pixels:</strong> {totalPixels.toLocaleString()}</p>
		<p class="text-lg">
			<strong>Wall Size:</strong> {totalWidthM.toFixed(2)} m × {totalHeightM.toFixed(2)} m
		</p>
		<p class="text-lg"><strong>Total Area:</strong> {totalArea.toFixed(2)} m²</p>
		<p class="text-lg"><strong>Total Power:</strong> {powerDisplay}</p>
		<p class="text-lg"><strong>Total Weight:</strong> {weightDisplay}</p>
	</div>
</section>
