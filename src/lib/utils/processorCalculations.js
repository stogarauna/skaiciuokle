/**
 * Utilities for computing how many panels/cabinets a processor can drive
 * based on resolution limits and power limits.
 */

/**
 * Compute max panels per port by resolution.
 * Strategy:
 *  - compute total pixels the processor supports: maxResX * maxResY
 *  - divide evenly by number of ports to estimate pixels per port
 *  - divide pixels per port by pixels per panel (panel.resX * panel.resY)
 *  - floor the result
 *
 * @param {{maxResX:number,maxResY:number,portNumber:number}} processor
 * @param {{resX:number,resY:number}} panel
 * @returns {number} max panels (cabinets) supported per port by resolution
 */
export const DEFAULT_PER_PORT_PIXEL_BUDGET = 780000; // 780k pixels per port

/**
 * Compute max panels per port by resolution. Uses a per-port pixel budget (default 780000 px).
 * @param {{maxResX:number,maxResY:number,portNumber:number}} processor
 * @param {{resX:number,resY:number}} panel
 * @param {number} [perPortPixelBudget]
 * @returns {number}
 */
export function maxPanelsPerPortByResolution(processor, panel, perPortPixelBudget = DEFAULT_PER_PORT_PIXEL_BUDGET) {
  if (!panel) return 0;
  const panelPixels = Math.max(1, panel.resX * panel.resY);
  const perPortPixels = Math.max(1, Math.floor(perPortPixelBudget));
  return Math.floor(perPortPixels / panelPixels);
}

/**
 * Compute max panels per port by available power.
 * @param {number} availablePowerPerPortW available wattage per port (W)
 * @param {{power:number}} panel panel object with per-panel power in W
 * @returns {number} max panels per port limited by power
 */
export function maxPanelsPerPortByPower(availablePowerPerPortW, panel) {
  if (!panel || !availablePowerPerPortW) return 0;
  return Math.floor(availablePowerPerPortW / Math.max(1, panel.power || 1));
}

/**
 * Compute max total panels by total available power for the whole processor.
 * @param {number} totalAvailablePowerW total available wattage for the processor
 * @param {{power:number}} panel
 * @returns {number}
 */
export function maxPanelsTotalByPower(totalAvailablePowerW, panel) {
  if (!panel || !totalAvailablePowerW) return 0;
  return Math.floor(totalAvailablePowerW / Math.max(1, panel.power || 1));
}

/**
 * Convenience: compute both resolution-based and power-based limits for a given processor
 * and panel. Accepts optional availablePowerPerPortW and totalAvailablePowerW to compute
 * power-limited values.
 *
 * @param {object} processor
 * @param {object} panel
 * @param {object} [opts]
 * @param {number} [opts.availablePowerPerPortW]
 * @param {number} [opts.totalAvailablePowerW]
 */
export function computeProcessorLimits(processor, panel, opts = {}) {
  const perPortPixelBudget = opts.perPortPixelBudget ?? DEFAULT_PER_PORT_PIXEL_BUDGET;
  const byRes = maxPanelsPerPortByResolution(processor, panel, perPortPixelBudget);
  const byPowerPerPort = opts.availablePowerPerPortW
    ? maxPanelsPerPortByPower(opts.availablePowerPerPortW, panel)
    : null;
  const totalByPower = opts.totalAvailablePowerW
    ? maxPanelsTotalByPower(opts.totalAvailablePowerW, panel)
    : null;

  return {
    maxPanelsPerPortByResolution: byRes,
    maxPanelsPerPortByPower: byPowerPerPort,
    maxPanelsTotalByPower: totalByPower,
    perPortPixelBudget
  };
}
