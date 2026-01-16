import { writable } from 'svelte/store';

// store selected panel by index to keep value serializable and simple to sync
export const selectedIndex = writable(0);
export const width = writable(1);
export const height = writable(1);

// Panels data loaded from Excel
/** @type {import('svelte/store').Writable<Array<{name:string,resX:number,resY:number,widthM:number,heightM:number,power:number,weightKg:number}>>} */
export const panelsData = writable([]);
