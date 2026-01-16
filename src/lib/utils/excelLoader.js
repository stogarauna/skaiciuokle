// @ts-nocheck
import * as XLSX from 'xlsx';

/**
 * Parse an Excel file into panel objects.
 * Expected headers (first row):
 * name, resX, resY, widthM, heightM, power, weightKg
 * @param {File|ArrayBuffer|Uint8Array} file
 * @returns {Promise<Array<{name:string,resX:number,resY:number,widthM:number,heightM:number,power:number,weightKg:number}>>}
 */
export async function parsePanelsExcel(file) {
  const data = file instanceof File ? await file.arrayBuffer() : file;
  const wb = XLSX.read(data, { type: 'array' });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  // Convert to JSON rows using header row
  const rows = XLSX.utils.sheet_to_json(ws, { defval: null });
  // Normalize each row to the panel schema
  const panels = rows.map((row, idx) => {
    const name = row.name ?? row.Name ?? row['Panel'] ?? `Panel ${idx+1}`;
    const resX = toNumber(row.resX ?? row.ResX ?? row['res x'] ?? row['Resolution X']);
    const resY = toNumber(row.resY ?? row.ResY ?? row['res y'] ?? row['Resolution Y']);
    const widthM = toNumber(row.widthM ?? row.WidthM ?? row['Width (m)'] ?? row.width ?? row.Width);
    const heightM = toNumber(row.heightM ?? row.HeightM ?? row['Height (m)'] ?? row.height ?? row.Height);
    const power = toNumber(row.power ?? row.Power ?? row['Power (W)'] ?? row['W']);
    const weightKg = toNumber(row.weightKg ?? row.WeightKg ?? row['Weight (kg)'] ?? row.weight ?? row.Weight);
    return { name, resX, resY, widthM, heightM, power, weightKg };
  }).filter(validPanel);
  return panels;
}

function toNumber(v) {
  if (v == null) return 0;
  const n = typeof v === 'number' ? v : parseFloat(String(v).replace(',', '.'));
  return Number.isFinite(n) ? n : 0;
}

function validPanel(p) {
  return (
    typeof p.name === 'string' && p.name.length > 0 &&
    p.resX > 0 && p.resY > 0 &&
    p.widthM > 0 && p.heightM > 0
  );
}
