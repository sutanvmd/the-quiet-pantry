// The Quiet Pantry — game state and rules.
// One plate at a time, built for the selected order card, step by step.
import { RECIPES, RECIPE, COWORKERS, DAY_SECONDS, MAX_ORDERS, COOK_SECONDS, PATIENCE } from './config.js';
import { mulberry32, pick, intRange } from './random.js';
import { sfx } from './audio.js';

let nextId = 1;

export function createWorld(seed = 1) {
  return {
    mode: 'title',           // 'title' | 'play' | 'summary'
    seed,
    rng: mulberry32(seed),
    day: 1,
    timeLeft: DAY_SECONDS,
    coins: 0, dayCoins: 0,
    served: 0, dayServed: 0, missed: 0, dayMissed: 0,
    combo: 0, bestCombo: 0,
    calm: false,             // Calm Mode: patience drains slowly, nobody storms off
    orders: [],              // {id, person, recipe, patience, patienceMax}
    selectedId: null,        // order the plate belongs to
    plate: [],               // completed steps for the selected order (ingredient ids / 'cook')
    cooking: 0,              // seconds left on the pan, 0 = idle
    spawnT: 0,
    popups: [],              // {x, y, text, color, t}
    shake: 0,
    lastTip: 0,
  };
}

function patienceFor(w) {
  return Math.max(PATIENCE.min, PATIENCE.base + (w.day - 1) * PATIENCE.perDay);
}

export function spawnOrder(w) {
  if (w.orders.length >= MAX_ORDERS) return null;
  const usedPeople = new Set(w.orders.map((o) => o.person.name));
  const free = COWORKERS.filter((c) => !usedPeople.has(c.name));
  const person = pick(w.rng, free.length ? free : COWORKERS);
  const recipe = pick(w.rng, RECIPES);
  const p = patienceFor(w);
  const order = { id: nextId++, person, recipe, patience: p, patienceMax: p };
  w.orders.push(order);
  if (w.selectedId === null) selectOrder(w, order.id);
  return order;
}

export function selectedOrder(w) {
  return w.orders.find((o) => o.id === w.selectedId) || null;
}

export function selectOrder(w, id) {
  if (!w.orders.some((o) => o.id === id)) return;
  if (w.selectedId !== id) { w.selectedId = id; w.plate = []; w.cooking = 0; }
}

export function nextStep(w) {
  const o = selectedOrder(w);
  if (!o) return null;
  return o.recipe.steps[w.plate.length] ?? null;
}

export function plateComplete(w) {
  const o = selectedOrder(w);
  return !!o && w.plate.length >= o.recipe.steps.length;
}

function popup(w, x, y, text, color = '#3d2c29') {
  w.popups.push({ x, y, text, color, t: 0 });
}

export function addIngredient(w, id, at = { x: 640, y: 360 }) {
  if (w.mode !== 'play' || w.cooking > 0) return;
  const step = nextStep(w);
  if (step === null) return;
  if (step !== id) {
    popup(w, at.x, at.y - 30, 'not next in the recipe', '#c0392b');
    w.shake = 0.25;
    return;
  }
  w.plate.push(id);
  sfx.add();
  popup(w, at.x, at.y - 30, '+ ' + id, '#5d7d59');
}

export function startCook(w) {
  if (w.mode !== 'play' || w.cooking > 0) return;
  if (nextStep(w) !== 'cook') return;
  w.cooking = COOK_SECONDS;
  sfx.cook();
}

export function trashLast(w) {
  if (w.mode !== 'play' || w.cooking > 0 || w.plate.length === 0) return;
  w.plate.pop();
  sfx.trash();
}

export function serve(w, at = { x: 640, y: 300 }) {
  if (w.mode !== 'play' || !plateComplete(w)) return;
  const o = selectedOrder(w);
  const frac = Math.max(0, o.patience / o.patienceMax);
  const tip = Math.round(o.recipe.price * 0.6 * frac) + (w.combo >= 2 ? w.combo : 0);
  const total = o.recipe.price + tip;
  w.coins += total; w.dayCoins += total;
  w.served += 1; w.dayServed += 1;
  w.combo += 1; w.bestCombo = Math.max(w.bestCombo, w.combo);
  w.lastTip = tip;
  popup(w, at.x, at.y - 40, `+$${total}  (tip $${tip})`, '#38603a');
  if (w.combo >= 2) popup(w, at.x, at.y - 76, `Combo x${w.combo} — the office is glowing`, '#c05a38');
  sfx.serve();
  w.orders = w.orders.filter((x) => x.id !== o.id);
  w.plate = []; w.selectedId = null;
  if (w.orders.length) selectOrder(w, w.orders[0].id);
  w.spawnT = Math.min(w.spawnT, 0.8);
}

export function startDay(w) {
  w.mode = 'play';
  w.timeLeft = DAY_SECONDS;
  w.dayCoins = 0; w.dayServed = 0; w.dayMissed = 0;
  w.orders = []; w.plate = []; w.selectedId = null; w.cooking = 0; w.combo = 0;
  spawnOrder(w); spawnOrder(w);
  w.spawnT = 2.5;
}

export function nextDay(w) { w.day += 1; startDay(w); sfx.day(); }

export function summaryStars(w) {
  if (w.dayServed >= 9) return 3;
  if (w.dayServed >= 6) return 2;
  if (w.dayServed >= 3) return 1;
  return 0;
}

export function update(w, dt) {
  for (const p of w.popups) { p.t += dt; p.y -= 26 * dt; }
  w.popups = w.popups.filter((p) => p.t < 1.6);
  if (w.shake > 0) w.shake = Math.max(0, w.shake - dt);
  if (w.mode !== 'play') return;

  w.timeLeft -= dt;
  if (w.timeLeft <= 0) { w.timeLeft = 0; w.mode = 'summary'; sfx.day(); return; }

  if (w.cooking > 0) {
    w.cooking -= dt;
    if (w.cooking <= 0) { w.cooking = 0; w.plate.push('cook'); sfx.cooked(); }
  }

  const drain = w.calm ? 0.45 : 1;
  for (const o of w.orders) o.patience -= dt * drain;
  const gone = w.orders.filter((o) => o.patience <= 0);
  for (const o of gone) {
    if (w.calm) { o.patience = o.patienceMax * 0.35; continue; } // they wait, kindly
    w.missed += 1; w.dayMissed += 1; w.combo = 0;
    popup(w, 640, 120, `${o.person.name} had to get back to work`, '#c0392b');
    sfx.sad();
    if (w.selectedId === o.id) { w.selectedId = null; w.plate = []; w.cooking = 0; }
  }
  if (!w.calm) w.orders = w.orders.filter((o) => o.patience > 0);
  if (w.selectedId === null && w.orders.length) selectOrder(w, w.orders[0].id);

  w.spawnT -= dt;
  if (w.spawnT <= 0) {
    if (spawnOrder(w)) w.spawnT = intRange(w.rng, 5, 9);
    else w.spawnT = 1.5;
  }
}
