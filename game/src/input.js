// Mouse + keyboard input. Hit boxes come from render.js layout so what you
// see is exactly what you can click.
import { L } from './render.js';
import { INGREDIENTS } from './config.js';
import { selectOrder, addIngredient, startCook, trashLast, serve, startDay, nextDay, togglePause } from './world.js';
import { setMuted } from './audio.js';

const inRect = (x, y, r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

export function bindInput(canvas, w) {
  function pos(ev) {
    const rect = canvas.getBoundingClientRect();
    return { x: (ev.clientX - rect.left) * (1280 / rect.width), y: (ev.clientY - rect.top) * (720 / rect.height) };
  }
  canvas.addEventListener('pointerdown', (ev) => {
    if (w.paused) return; // clicks wait until the day resumes
    const { x, y } = pos(ev);
    if (inRect(x, y, L.muteBtn)) { w.muted = !w.muted; setMuted(w.muted); return; }
    if (w.mode === 'title') { if (inRect(x, y, L.playBtn)) startDay(w); return; }
    if (w.mode === 'summary') { if (inRect(x, y, L.nextBtn)) nextDay(w); return; }
    if (inRect(x, y, L.calmBtn)) { w.calm = !w.calm; return; }
    for (let i = 0; i < w.orders.length; i++) if (inRect(x, y, L.card(i))) { selectOrder(w, w.orders[i].id); return; }
    for (let i = 0; i < INGREDIENTS.length; i++) {
      const b = L.bin(i);
      if (inRect(x, y, b)) { addIngredient(w, INGREDIENTS[i].id, { x: b.x + b.w / 2, y: b.y }); return; }
    }
    if (inRect(x, y, L.stove) || inRect(x, y, L.cookBtn)) { startCook(w); return; }
    if (inRect(x, y, L.serveBtn)) { serve(w); return; }
    if (inRect(x, y, L.trashBtn)) { trashLast(w); return; }
  });
  window.addEventListener('keydown', (ev) => {
    if ((ev.key === 'p' || ev.key === 'P' || ev.key === 'Escape') && w.mode === 'play') { togglePause(w); return; }
    if (w.paused) return; // only P / Esc get through while paused
    if (w.mode === 'title') { if (ev.key === 'Enter' || ev.key === ' ') startDay(w); return; }
    if (w.mode === 'summary') { if (ev.key === 'Enter') nextDay(w); return; }
    const ing = INGREDIENTS.find((i) => i.key === ev.key);
    if (ing) { addIngredient(w, ing.id, { x: 600, y: 470 }); return; }
    if (ev.key === 'c' || ev.key === 'C') startCook(w);
    else if (ev.key === 'Enter') serve(w);
    else if (ev.key === 'Backspace') { ev.preventDefault(); trashLast(w); }
  });
}
