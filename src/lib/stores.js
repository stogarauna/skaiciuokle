import { writable } from 'svelte/store';
import { panels } from './data/panels.js';

// store selected panel by index to keep value serializable and simple to sync
export const selectedIndex = writable(0);
export const width = writable(1);
export const height = writable(1);
