<script>
// @ts-nocheck
	import { selectedIndex, width, height, panelsData } from "$lib/stores";

	// derive selected panel from the selectedIndex store
	$: selected = ($panelsData && $panelsData.length > 0) ? $panelsData[$selectedIndex] : {
		name: "",
		resX: 0,
		resY: 0,
		widthM: 0,
		heightM: 0,
		power: 0,
		weightKg: 0
	};

	// derived values using store values
	$: totalPanels = $width * $height;

	// total resolution
	$: totalWidthPx = $width * selected.resX;
	$: totalHeightPx = $height * selected.resY;
	$: resolutionText = `${totalWidthPx} × ${totalHeightPx}`;

	// aspect ratio helper
	function gcd(a, b) {
		return b === 0 ? a : gcd(b, a % b);
	}
	$: ratioGCD = gcd(totalWidthPx, totalHeightPx);
	$: aspectRatio = `${(totalWidthPx / ratioGCD).toFixed(0)} : ${(totalHeightPx / ratioGCD).toFixed(0)}`;

	// total pixels
	$: totalPixels = totalWidthPx * totalHeightPx;

	// threshold indicator for ports: compute how many whole ports are exceeded
	const pixelThreshold = 782000;
	$: portsOver = Math.floor(totalPixels / pixelThreshold);

	// physical dimensions
	$: totalWidthM = $width * selected.widthM;
	$: totalHeightM = $height * selected.heightM;
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
		<div style="display:block;width:100%">
			<label for="panelSelect" class="font-semibold text-gray-700 mb-1" style="display:block">LED Panel Type:</label>
			<select
				id="panelSelect"
				value={$selectedIndex}
				on:change={e => selectedIndex.set(parseInt(e.target.value))}
				class="w-full border border-gray-300 rounded-xl p-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
			>
				{#each $panelsData as panel, i}
					<option value={i}>{panel.name}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Size inputs -->
	<div class="bg-white p-5 rounded-2xl shadow-md grid grid-cols-2 gap-4">
		<div>
			<label for="widthInput" class="block mb-1 font-semibold text-gray-700">
				Width (panels)
			</label>
			<div class="flex items-center gap-2">
				<button type="button" aria-label="Decrease width" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center select-none active:bg-gray-300" on:click={() => width.set(Math.max(1, $width - 1))}>-</button>
				<input
					id="widthInput"
					type="number"
					min="1"
					value={$width}
					on:input={e => width.set(Math.max(1, parseInt(e.target.value) || 1))}
					class="border border-gray-300 rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500"
					style="width: 4.5rem; min-width: 0;"
				/>
				<button type="button" aria-label="Increase width" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center select-none active:bg-gray-300" on:click={() => width.set($width + 1)}>+</button>
			</div>
		</div>

		<div>
			<label for="heightInput" class="block mb-1 font-semibold text-gray-700">
				Height (panels)
			</label>
			<div class="flex items-center gap-2">
				<button type="button" aria-label="Decrease height" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center select-none active:bg-gray-300" on:click={() => height.set(Math.max(1, $height - 1))}>-</button>
				<input
					id="heightInput"
					type="number"
					min="1"
					value={$height}
					on:input={e => height.set(Math.max(1, parseInt(e.target.value) || 1))}
					class="border border-gray-300 rounded-xl p-3 text-center focus:ring-2 focus:ring-blue-500"
					style="width: 4.5rem; min-width: 0;"
				/>
				<button type="button" aria-label="Increase height" class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center select-none active:bg-gray-300" on:click={() => height.set($height + 1)}>+</button>
			</div>
		</div>
	</div>

	<!-- Results -->
	<div class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-5 rounded-2xl shadow-md space-y-2">
		<p><strong>Total Panels:</strong> {totalPanels}</p>
		<p><strong>Resolution:</strong> {resolutionText}</p>
		<p><strong>Aspect Ratio:</strong> {aspectRatio}</p>
		<p>
			<strong>Total Pixels:</strong>
			<span class={portsOver >= 1 ? 'font-semibold' : ''} style={portsOver >= 1 ? 'color:#dc2626;font-weight:600;' : ''}>
				{totalPixels.toLocaleString()}
			</span>
			{#if portsOver >= 1}
				<span style="color:#dc2626;"> (More than {portsOver} port{portsOver > 1 ? 's' : ''})</span>
			{/if}
		</p>
		<p>
			<strong>Wall Size:</strong> {totalWidthM.toFixed(2)} m × {totalHeightM.toFixed(2)} m
		</p>
		<p><strong>Total Area:</strong> {totalArea.toFixed(2)} m²</p>
		<p><strong>Total Power:</strong> {powerDisplay}</p>
		<p><strong>Total Weight:</strong> {weightDisplay}</p>
	</div>
</section>

<div class="mt-4 flex justify-center">
	<a href="/extra" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Eiti į Extra puslapį</a>
  
</div>
