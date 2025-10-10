<script>
  import { panels } from "../../lib/data/panels.js";
  import { onMount } from 'svelte';

  let selected = panels[0];
  let width = 1;
  let height = 1;

  // presets
  /** @type {{name: string, w: number, h: number}[]} */
  const presets = [
    { name: 'Small (2x2)', w: 2, h: 2 },
    { name: 'Medium (4x3)', w: 4, h: 3 },
    { name: 'Large (8x6)', w: 8, h: 6 }
  ];

  /** @param {{name: string, w: number, h: number}} p */
  function applyPreset(p) {
    width = p.w;
    height = p.h;
  }

  function reset() {
    selected = panels[0];
    width = 1;
    height = 1;
  }

  // export CSV: panels count, total pixels, power
  $: totalWidthPx = width * selected.resX;
  $: totalHeightPx = height * selected.resY;
  $: totalPixels = totalWidthPx * totalHeightPx;
  $: totalPanels = width * height;
  $: totalPower = totalPanels * selected.power;

  function exportCSV() {
    const rows = [
      ['Panel', selected.name],
      ['Width (panels)', width],
      ['Height (panels)', height],
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
</script>

<section class="space-y-5">
  <div class="bg-white p-5 rounded-2xl shadow-md">
    <label for="presets" class="block mb-2 font-semibold">Presets</label>
    <div class="flex gap-2">
      {#each presets as p}
        <button type="button" id="presets" class="px-3 py-2 bg-gray-100 rounded" on:click={() => applyPreset(p)}>{p.name}</button>
      {/each}
    </div>
  </div>

  <div class="bg-white p-5 rounded-2xl shadow-md grid grid-cols-2 gap-4">
    <div>
      <label for="extraWidth" class="block mb-1 font-semibold">Width (panels)</label>
        <input id="extraWidth" type="number" min="1" bind:value={width} class="w-20 border rounded p-2" />
    </div>
    <div>
        <label for="extraHeight" class="block mb-1 font-semibold">Height (panels)</label>
        <input id="extraHeight" type="number" min="1" bind:value={height} class="w-20 border rounded p-2" />
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
