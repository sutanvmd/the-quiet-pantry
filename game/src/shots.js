// Deterministic staged scenes for the screenshots (?shot=<name>&seed=<n>).
// Each scene is a real game state, arranged by hand from the same tables the
// live game uses — what the screenshots show is what playing looks like.
import { COWORKERS, RECIPE } from './config.js';

let id = 100;
function order(personIdx, recipeId, patienceFrac) {
  const recipe = RECIPE[recipeId];
  const max = 75;
  return { id: id++, person: COWORKERS[personIdx], recipe, patience: max * patienceFrac, patienceMax: max };
}

export function stageShot(w, name) {
  id = 100;
  if (name === 'start') { w.mode = 'title'; return; }
  if (name === 'rush') {
    w.mode = 'play'; w.day = 2; w.coins = 47; w.served = 5; w.combo = 2; w.timeLeft = 96;
    w.orders = [order(0, 'salmon-bowl', 0.72), order(3, 'omelette', 0.5), order(2, 'ramen', 0.88)];
    w.selectedId = w.orders[0].id;
    w.plate = ['rice', 'salmon'];       // next step is 'cook' — the pan is busy
    w.cooking = 1.3;
    w.popups = [{ x: 600, y: 464, text: 'almost there…', color: '#c05a38', t: 0.2 }];
    return;
  }
  if (name === 'serve') {
    w.mode = 'play'; w.day = 1; w.coins = 63; w.served = 6; w.combo = 3; w.timeLeft = 121;
    w.orders = [order(4, 'caprese', 0.8), order(1, 'tomato-soup', 0.62), order(5, 'berry-bowl', 0.95)];
    w.selectedId = w.orders[0].id;
    w.plate = ['bread', 'tomato', 'cheese', 'greens', 'cook'];  // complete, ready to serve
    w.cooking = 0;
    w.popups = [
      { x: 705, y: 626, text: '+$23  (tip $9)', color: '#ffefd6', t: 0.1 },
    ];
    return;
  }
  if (name === 'summary') {
    w.mode = 'summary'; w.day = 1;
    w.dayServed = 8; w.dayMissed = 1; w.dayCoins = 118; w.coins = 118;
    w.served = 8; w.missed = 1; w.bestCombo = 4; w.timeLeft = 0;
    return;
  }
  w.mode = 'title';
}
