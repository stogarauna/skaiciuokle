<script>
  import { panels } from "../../lib/data/panels.js";
  import { selectedIndex, width, height } from "$lib/stores";
  import { processors } from "../../lib/data/processors.js";
  import { computeProcessorLimits } from "../../lib/utils/processorCalculations.js";

  // derive selected panel from store
  $: selected = panels[$selectedIndex];

  // presets
  /** @type {{name: string, w: number, h: number}[]} */
  const presets = [
    { name: 'Small (2x2)', w: 2, h: 2 },
    { name: 'Medium (4x3)', w: 4, h: 3 },
    { name: 'Large (8x6)', w: 8, h: 6 }
  ];

  /** @param {{name: string, w: number, h: number}} p */
  function applyPreset(p) {
    width.set(p.w);
    height.set(p.h);
  }

  function reset() {
    selectedIndex.set(0);
    width.set(1);
    height.set(1);
  }

  // export CSV: panels count, total pixels, power
  $: totalWidthPx = $width * selected.resX;
  $: totalHeightPx = $height * selected.resY;
  $: totalPixels = totalWidthPx * totalHeightPx;
  $: totalPanels = $width * $height;
  $: totalPower = totalPanels * selected.power;

  function exportCSV() {
    const rows = [
      ['Panel', selected.name],
      ['Width (panels)', $width],
      ['Height (panels)', $height],
      ['Total Panels', totalPanels],
      ['Total Pixels', totalPixels],
      ['Total Power (W)', totalPower]
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'led-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  // preview - simple inline box showing resolution
  let showPreview = false;

  // processor selection for calculations (local index)
  let processorIndex = 0;
  $: processor = processors[processorIndex];

  // computed limits
  // allow configuring per-port pixel budget (default 780k)
  let perPortPixelBudget = 780000;
  $: limits = computeProcessorLimits(processor, selected, { perPortPixelBudget });

  // editable per-port power budget (W)
  let perPortPowerW = 3500;
  $: maxPanelsPerPortByPower = Math.floor(perPortPowerW / Math.max(1, selected.power || 1));
</script>

<section class="space-y-5">
  <div class="bg-white p-5 rounded-2xl shadow-md">
    <div class="block mb-2 font-semibold">Presets</div>
    <div class="flex gap-2">
      {#each presets as p}
        <button type="button" class="px-3 py-2 bg-gray-100 rounded" on:click={() => applyPreset(p)}>{p.name}</button>
      {/each}
    </div>
  </div>

  <!-- Model info card -->
  <div class="bg-white p-5 rounded-2xl shadow-md">
    <h3 class="font-semibold mb-2">Selected LED Model</h3>
    <div class="text-sm text-gray-700 space-y-1">
      <div><strong>Name:</strong> {selected.name}</div>
      <div><strong>Max panels per port (by resolution):</strong> {limits.maxPanelsPerPortByResolution}</div>
      <div><strong>Max panels per port (by power):</strong> {maxPanelsPerPortByPower}</div>
      <div><strong>Resolution / panel:</strong> {selected.resX} × {selected.resY} px</div>
      <div><strong>Total resolution:</strong> {totalWidthPx} × {totalHeightPx} px</div>
      <div><strong>Power / panel:</strong> {selected.power} W</div>
      <div><strong>Weight / panel:</strong> {selected.weightKg} kg</div>
    </div>
  </div>

  <!-- Per-port power and processor selection -->
  <div class="bg-white p-5 rounded-2xl shadow-md grid grid-cols-1 gap-4">
    <div class="flex items-center gap-4">
      <div>
        <label for="perPortPower" class="block mb-1 font-semibold">Per-port power (W)</label>
        <input id="perPortPower" type="number" class="border rounded p-1 w-32" bind:value={perPortPowerW} />
      </div>

      <div>
        <label for="processorSelect" class="block mb-1 font-semibold">Processor</label>
        <select id="processorSelect" class="border rounded p-2" value={processorIndex} on:change={e => processorIndex = parseInt(e.target.value)}>
          {#each processors as proc, i}
            <option value={i}>{proc.name} (ports: {proc.portNumber})</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="mt-3 text-sm text-gray-700">
      <div><strong>Processor max resolution:</strong> {processor.maxResX} × {processor.maxResY}</div>
    </div>
  </div>

    <div class="bg-white p-5 rounded-2xl shadow-md grid grid-cols-2 gap-4">
    <div>
      <label for="extraWidth" class="block mb-1 font-semibold">Width (panels)</label>
  <input id="extraWidth" type="number" min="1" value={$width} on:input={e => width.set(Math.max(1, parseInt(e.target.value) || 1))} class="w-20 border rounded p-2" />
    </div>
    <div>
        <label for="extraHeight" class="block mb-1 font-semibold">Height (panels)</label>
  <input id="extraHeight" type="number" min="1" value={$height} on:input={e => height.set(Math.max(1, parseInt(e.target.value) || 1))} class="w-20 border rounded p-2" />
    </div>
  </div>

  <div class="bg-white p-5 rounded-2xl shadow-md space-y-2">
    <button class="px-4 py-2 bg-blue-600 text-white rounded" on:click={reset}>Reset</button>
    <button class="px-4 py-2 bg-green-600 text-white rounded" on:click={exportCSV}>Export CSV</button>
    <button class="px-4 py-2 bg-gray-800 text-white rounded" on:click={() => showPreview = !showPreview}>{showPreview ? 'Hide Preview' : 'Show Preview'}</button>

        {#if showPreview}
      <div class="mt-3 p-3 border rounded">
        <p><strong>Preview</strong></p>
        <p>Panel: {selected.name}</p>
        <p>Resolution: {totalWidthPx} × {totalHeightPx}</p>
        <p>Total Panels: {totalPanels}</p>
        <p>Total Power: {totalPower} W</p>
      </div>
    {/if}
  </div>
</section>
