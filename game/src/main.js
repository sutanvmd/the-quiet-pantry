// The Quiet Pantry — boot. Two modes:
//  - live: requestAnimationFrame loop with input, starting at the title.
//  - staged: ?shot=<name>&seed=<n> renders one deterministic frame for the
//    screenshots and then stops (no timers, no sound).
import { createWorld, update } from './world.js';
import { render } from './render.js';
import { bindInput } from './input.js';
import { stageShot } from './shots.js';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const params = new URLSearchParams(location.search);
const seed = Number(params.get('seed') || 1) >>> 0;
const shot = params.get('shot');

const w = createWorld(seed);
w.muted = false;

if (shot) {
  stageShot(w, shot);
  render(ctx, w);
  window.__shotReady = true;
  document.body.dataset.ready = '1';
} else {
  bindInput(canvas, w);
  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    update(w, dt);
    render(ctx, w);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
