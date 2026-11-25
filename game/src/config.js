// The Quiet Pantry — content tables.
// A cozy after-hours office pantry: you cook comfort food for tired coworkers.
// Everything here is original: names, dishes, people, palette.

// Ingredient bins on the counter, left to right. `key` is the keyboard shortcut.
export const INGREDIENTS = [
  { id: 'bread',   name: 'Sourdough', key: '1', color: '#e3b778', dark: '#b9853f' },
  { id: 'cheese',  name: 'Cheese',    key: '2', color: '#f6c945', dark: '#d19a17' },
  { id: 'tomato',  name: 'Tomato',    key: '3', color: '#e4572e', dark: '#b23a1a' },
  { id: 'egg',     name: 'Egg',       key: '4', color: '#fdf3d8', dark: '#e8a13c' },
  { id: 'rice',    name: 'Rice',      key: '5', color: '#f7f2e7', dark: '#cbbfa5' },
  { id: 'salmon',  name: 'Salmon',    key: '6', color: '#f1947f', dark: '#cf6350' },
  { id: 'avocado', name: 'Avocado',   key: '7', color: '#7fb069', dark: '#4c7a3f' },
  { id: 'greens',  name: 'Greens',    key: '8', color: '#588157', dark: '#38603a' },
  { id: 'berries', name: 'Berries',   key: '9', color: '#7d4a7e', dark: '#552f56' },
  { id: 'noodles', name: 'Noodles',   key: '0', color: '#f2d492', dark: '#cfa64f' },
];
export const ING = Object.fromEntries(INGREDIENTS.map((i) => [i.id, i]));

// A recipe is a sequence of steps. A step is an ingredient id, or 'cook'
// (send the plate to the pan and wait for the progress bar).
export const RECIPES = [
  { id: 'grilled-cheese', name: 'Grilled Cheese, Extra Melt', price: 9,  steps: ['bread', 'cheese', 'cheese', 'cook'] },
  { id: 'tomato-soup',    name: 'Tomato Soup & Toast',        price: 11, steps: ['tomato', 'tomato', 'cook', 'bread'] },
  { id: 'salmon-bowl',    name: 'Salmon Rice Bowl',           price: 16, steps: ['rice', 'salmon', 'cook', 'avocado', 'greens'] },
  { id: 'omelette',       name: 'Herb Omelette',              price: 12, steps: ['egg', 'egg', 'cook', 'greens', 'cheese'] },
  { id: 'avocado-toast',  name: 'Avocado Toast, Soft Egg',    price: 13, steps: ['bread', 'avocado', 'egg', 'cook'] },
  { id: 'ramen',          name: 'Quiet Night Ramen',          price: 15, steps: ['noodles', 'cook', 'egg', 'greens'] },
  { id: 'berry-bowl',     name: 'Berry Yoghurt Bowl',         price: 10, steps: ['berries', 'berries', 'greens', 'bread'] },
  { id: 'caprese',        name: 'Caprese Panini',             price: 14, steps: ['bread', 'tomato', 'cheese', 'greens', 'cook'] },
];
export const RECIPE = Object.fromEntries(RECIPES.map((r) => [r.id, r]));

// Coworkers who drift in after their meetings run long. Faces are drawn from
// these traits (skin, hair style/colour, shirt) — no images, all canvas.
export const COWORKERS = [
  { name: 'Maya',  role: 'Marketing',  skin: '#c68863', hair: '#2e1c12', style: 'bun',    shirt: '#7d4a7e' },
  { name: 'Rian',  role: 'Finance',    skin: '#a06a42', hair: '#14100c', style: 'short',  shirt: '#38618c' },
  { name: 'Sinta', role: 'Design',     skin: '#e0aa7e', hair: '#5a3220', style: 'bob',    shirt: '#e07856' },
  { name: 'Bimo',  role: 'Engineering',skin: '#8a5a34', hair: '#0f0d0b', style: 'short',  shirt: '#588157' },
  { name: 'Laras', role: 'People Ops', skin: '#d99e6a', hair: '#3a2415', style: 'long',   shirt: '#c94f6d' },
  { name: 'Dimas', role: 'Support',    skin: '#b57e52', hair: '#241207', style: 'cap',    shirt: '#d19a17' },
  { name: 'Nadia', role: 'Legal',      skin: '#e8b48c', hair: '#17120e', style: 'bob',    shirt: '#4a4e69' },
  { name: 'Eko',   role: 'Data',       skin: '#96683e', hair: '#0c0a08', style: 'short',  shirt: '#6d8ea0' },
];

export const PALETTE = {
  cream: '#fff6e9', paper: '#ffefd6', ink: '#3d2c29', softInk: '#6b554b',
  wood: '#b08968', woodDark: '#8a6547', counter: '#7a4a2b',
  terra: '#e07856', terraDark: '#c05a38', sage: '#8fae8b', sageDark: '#5d7d59',
  gold: '#f6c945', night: '#2e4057', nightTop: '#1d2a3a', lamp: '#ffd98a',
  cardEdge: '#d9c6ae', danger: '#c0392b',
};

export const DAY_SECONDS = 150;          // one workday evening shift
export const MAX_ORDERS = 3;             // order board slots
export const COOK_SECONDS = 2.6;         // pan time for a 'cook' step
export const PATIENCE = { base: 75, perDay: -4, min: 42 }; // seconds per order
