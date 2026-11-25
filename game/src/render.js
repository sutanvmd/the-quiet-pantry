// The Quiet Pantry — all canvas drawing. Warm evening pantry, drawn shapes only.
import { INGREDIENTS, ING, PALETTE as P } from './config.js';
import { selectedOrder, plateComplete, summaryStars } from './world.js';

export const L = {
  card: (i) => ({ x: 16 + i * 424, y: 76, w: 400, h: 148 }),
  bin: (i) => ({ x: 24 + i * 124, y: 486, w: 116, h: 118 }),
  cookBtn: { x: 330, y: 646, w: 230, h: 58 },
  serveBtn: { x: 580, y: 646, w: 250, h: 58 },
  trashBtn: { x: 850, y: 646, w: 180, h: 58 },
  stove: { x: 906, y: 292, w: 330, h: 176 },
  plate: { x: 600, y: 392 },
  calmBtn: { x: 1030, y: 13, w: 128, h: 38 },
  muteBtn: { x: 1168, y: 13, w: 46, h: 38 },
  playBtn: { x: 490, y: 470, w: 300, h: 72 },
  nextBtn: { x: 490, y: 520, w: 300, h: 64 },
};

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function circle(ctx, x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); }
function text(ctx, s, x, y, size, color, align = 'left', bold = false, font = 'Georgia, serif') {
  ctx.fillStyle = color; ctx.font = `${bold ? 'bold ' : ''}${size}px ${font}`;
  ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillText(s, x, y);
}

export function drawIngredientIcon(ctx, id, x, y, s) {
  const ing = ING[id]; if (!ing) return;
  ctx.save(); ctx.translate(x, y);
  ctx.lineWidth = Math.max(2, s * 0.09); ctx.strokeStyle = P.ink;
  if (id === 'bread') {
    ctx.fillStyle = ing.color; rr(ctx, -s, -s * 0.62, 2 * s, s * 1.24, s * 0.5); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-s * 0.45, -s * 0.3); ctx.lineTo(-s * 0.15, -s * 0.05);
    ctx.moveTo(0, -s * 0.38); ctx.lineTo(s * 0.28, -s * 0.12); ctx.strokeStyle = ing.dark; ctx.stroke();
  } else if (id === 'cheese') {
    ctx.fillStyle = ing.color; ctx.beginPath();
    ctx.moveTo(-s, s * 0.6); ctx.lineTo(s, s * 0.6); ctx.lineTo(s, -s * 0.5); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ing.dark;
    circle(ctx, s * 0.3, s * 0.25, s * 0.16); ctx.fill();
    circle(ctx, -s * 0.25, s * 0.35, s * 0.12); ctx.fill();
  } else if (id === 'tomato') {
    ctx.fillStyle = ing.color; circle(ctx, 0, s * 0.12, s * 0.82); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4c7a3f'; ctx.beginPath();
    ctx.moveTo(0, -s * 0.85); ctx.lineTo(s * 0.3, -s * 0.45); ctx.lineTo(-s * 0.3, -s * 0.45); ctx.closePath(); ctx.fill();
  } else if (id === 'egg') {
    ctx.fillStyle = ing.color; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.85, s * 0.95, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ing.dark; circle(ctx, 0, s * 0.1, s * 0.36); ctx.fill();
  } else if (id === 'rice' || id === 'noodles') {
    ctx.fillStyle = '#fdfaf2'; ctx.beginPath(); ctx.moveTo(-s, -s * 0.1);
    ctx.quadraticCurveTo(0, s * 1.05, s, -s * 0.1); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = ing.color; ctx.beginPath(); ctx.ellipse(0, -s * 0.18, s * 0.92, s * 0.4, 0, Math.PI, Math.PI * 2); ctx.fill(); ctx.stroke();
    if (id === 'noodles') { ctx.strokeStyle = ing.dark; ctx.beginPath();
      for (let i = -1; i <= 1; i++) { ctx.moveTo(i * s * 0.4 - s * 0.18, -s * 0.3); ctx.quadraticCurveTo(i * s * 0.4, -s * 0.62, i * s * 0.4 + s * 0.18, -s * 0.3); } ctx.stroke(); }
  } else if (id === 'salmon') {
    ctx.fillStyle = ing.color; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.95, s * 0.62, -0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = '#fdf3d8'; ctx.beginPath();
    ctx.moveTo(-s * 0.5, -s * 0.3); ctx.quadraticCurveTo(0, 0, -s * 0.5, s * 0.42);
    ctx.moveTo(s * 0.05, -s * 0.48); ctx.quadraticCurveTo(s * 0.5, 0, s * 0.05, s * 0.5); ctx.stroke();
  } else if (id === 'avocado') {
    ctx.fillStyle = ing.dark; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.72, s * 0.95, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#b7d977'; ctx.beginPath(); ctx.ellipse(0, 0, s * 0.55, s * 0.78, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#8a6547'; circle(ctx, 0, s * 0.25, s * 0.26); ctx.fill();
  } else if (id === 'greens') {
    ctx.fillStyle = ing.color;
    for (const a of [-0.6, 0, 0.6]) { ctx.save(); ctx.rotate(a);
      ctx.beginPath(); ctx.ellipse(0, -s * 0.35, s * 0.34, s * 0.66, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
    ctx.strokeStyle = ing.dark; ctx.beginPath(); ctx.moveTo(0, s * 0.7); ctx.lineTo(0, -s * 0.6); ctx.stroke();
  } else if (id === 'berries') {
    const pts = [[-0.4, 0.25], [0.05, -0.3], [0.45, 0.2], [-0.05, 0.45], [0.35, -0.45]];
    for (const [px, py] of pts) { ctx.fillStyle = ing.color; circle(ctx, px * s, py * s, s * 0.34); ctx.fill(); ctx.stroke(); }
    ctx.fillStyle = '#4c7a3f'; ctx.beginPath(); ctx.ellipse(0, -s * 0.72, s * 0.3, s * 0.14, 0, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();
}

export function drawFace(ctx, person, x, y, r, mood = 'ok') {
  ctx.save(); ctx.translate(x, y);
  if (person.style === 'long' || person.style === 'bob') {
    ctx.fillStyle = person.hair; rr(ctx, -r * 1.05, -r * 0.7, r * 2.1, r * (person.style === 'long' ? 2.1 : 1.6), r * 0.7); ctx.fill();
  }
  ctx.fillStyle = person.skin; circle(ctx, 0, 0, r); ctx.fill();
  if (person.style === 'short') { ctx.fillStyle = person.hair; ctx.beginPath(); ctx.arc(0, -r * 0.18, r * 0.98, Math.PI * 1.05, Math.PI * 1.95); ctx.quadraticCurveTo(0, -r * 1.5, -r * 0.95, -r * 0.2); ctx.fill(); }
  if (person.style === 'bun') { ctx.fillStyle = person.hair; circle(ctx, 0, -r * 1.12, r * 0.42); ctx.fill();
    ctx.beginPath(); ctx.arc(0, -r * 0.15, r * 0.99, Math.PI * 1.08, Math.PI * 1.92); ctx.quadraticCurveTo(0, -r * 1.35, -r * 0.95, -r * 0.18); ctx.fill(); }
  if (person.style === 'bob') { ctx.fillStyle = person.hair; ctx.beginPath(); ctx.arc(0, -r * 0.2, r * 1.0, Math.PI * 1.05, Math.PI * 1.95); ctx.quadraticCurveTo(0, -r * 1.45, -r * 0.98, -r * 0.2); ctx.fill(); }
  if (person.style === 'cap') { ctx.fillStyle = '#38618c'; ctx.beginPath(); ctx.arc(0, -r * 0.25, r * 0.99, Math.PI, Math.PI * 2); ctx.fill();
    rr(ctx, -r * 1.25, -r * 0.32, r * 2.5, r * 0.2, r * 0.1); ctx.fill(); }
  ctx.fillStyle = P.ink;
  circle(ctx, -r * 0.34, -r * 0.05, r * 0.075); ctx.fill();
  circle(ctx, r * 0.34, -r * 0.05, r * 0.075); ctx.fill();
  ctx.strokeStyle = P.ink; ctx.lineWidth = Math.max(1.6, r * 0.07); ctx.beginPath();
  if (mood === 'happy') ctx.arc(0, r * 0.28, r * 0.42, 0.15 * Math.PI, 0.85 * Math.PI);
  else if (mood === 'sad') ctx.arc(0, r * 0.62, r * 0.36, 1.15 * Math.PI, 1.85 * Math.PI);
  else ctx.arc(0, r * 0.3, r * 0.3, 0.2 * Math.PI, 0.8 * Math.PI);
  ctx.stroke();
  ctx.fillStyle = 'rgba(224,120,86,.35)';
  circle(ctx, -r * 0.58, r * 0.3, r * 0.16); ctx.fill();
  circle(ctx, r * 0.58, r * 0.3, r * 0.16); ctx.fill();
  ctx.restore();
}

function drawKitchen(ctx, w) {
  ctx.fillStyle = '#f3e2c7'; ctx.fillRect(0, 0, 1280, 720);
  // evening window
  ctx.fillStyle = P.woodDark; rr(ctx, 36, 250, 300, 218, 10); ctx.fill();
  const grad = ctx.createLinearGradient(0, 258, 0, 460);
  grad.addColorStop(0, '#31456b'); grad.addColorStop(1, '#7a5a7e');
  ctx.fillStyle = grad; rr(ctx, 46, 260, 280, 198, 6); ctx.fill();
  ctx.fillStyle = '#ffd98a';
  for (const [sx, sy, sr] of [[90, 290, 2.4], [150, 275, 1.8], [230, 300, 2.2], [290, 282, 1.6], [120, 330, 1.5], [265, 345, 1.8]]) { circle(ctx, sx, sy, sr); ctx.fill(); }
  ctx.fillStyle = '#22314a';
  const towers = [[52, 380, 34, 78], [92, 356, 26, 102], [124, 392, 40, 66], [170, 368, 30, 90], [206, 388, 24, 70], [236, 350, 34, 108], [276, 384, 44, 74]];
  for (const [tx, ty, tw, th] of towers) ctx.fillRect(tx, ty, tw, th);
  ctx.fillStyle = '#ffd98a';
  for (const [tx, ty] of [[64, 396], [104, 380], [140, 408], [182, 392], [246, 376], [292, 404], [256, 420]]) ctx.fillRect(tx, ty, 4, 5);
  text(ctx, 'the city is still at work — dinner helps', 186, 240, 15, P.softInk, 'center', false, 'Georgia, serif');
  // string lights
  ctx.strokeStyle = '#8a6547'; ctx.lineWidth = 2; ctx.beginPath();
  ctx.moveTo(360, 252); ctx.quadraticCurveTo(640, 292, 900, 254); ctx.stroke();
  for (let i = 0; i <= 10; i++) {
    const t = i / 10, lx = 360 + 540 * t, ly = 252 + Math.sin(t * Math.PI) * 26 + 2;
    ctx.fillStyle = P.lamp; circle(ctx, lx, ly + 8, 5); ctx.fill();
    ctx.strokeStyle = 'rgba(255,217,138,.35)'; circle(ctx, lx, ly + 8, 10); ctx.stroke();
  }
  // shelf with jars
  ctx.fillStyle = P.wood; ctx.fillRect(880, 262, 356, 12);
  const jarCols = ['#e4572e', '#7fb069', '#f6c945', '#7d4a7e', '#f1947f'];
  jarCols.forEach((c, i) => { const jx = 906 + i * 66;
    ctx.fillStyle = 'rgba(255,255,255,.75)'; rr(ctx, jx, 226, 40, 36, 6); ctx.fill();
    ctx.fillStyle = c; rr(ctx, jx + 5, 238, 30, 19, 4); ctx.fill();
    ctx.fillStyle = P.woodDark; ctx.fillRect(jx + 4, 220, 32, 7); });
  // counter surface
  ctx.fillStyle = P.counter; ctx.fillRect(0, 470, 1280, 250);
  ctx.fillStyle = 'rgba(255,255,255,.08)'; ctx.fillRect(0, 470, 1280, 6);
}

function drawStove(ctx, w) {
  const s = L.stove;
  const nextIsCook = w.mode === 'play' && !plateComplete(w) && w.plate.length < (selectedOrder(w)?.recipe.steps.length ?? 0)
    && selectedOrder(w)?.recipe.steps[w.plate.length] === 'cook';
  ctx.fillStyle = '#4a3630'; rr(ctx, s.x, s.y, s.w, s.h, 12); ctx.fill();
  ctx.fillStyle = '#33241f'; circle(ctx, s.x + 92, s.y + 88, 56); ctx.fill();
  circle(ctx, s.x + 238, s.y + 88, 56); ctx.fill();
  // the pan on the left burner
  ctx.fillStyle = '#1f1a17'; circle(ctx, s.x + 92, s.y + 88, 46); ctx.fill();
  ctx.fillStyle = '#5a463c'; ctx.fillRect(s.x + 128, s.y + 76, 58, 13);
  const cooking = w.cooking > 0;
  if (cooking || nextIsCook) {
    ctx.fillStyle = cooking ? '#e8a13c' : '#cbbfa5';
    ctx.beginPath(); ctx.ellipse(s.x + 92, s.y + 88, 34, 12, 0, 0, Math.PI * 2); ctx.fill();
  }
  if (cooking) {
    const total = 2.6, frac = 1 - w.cooking / total;
    ctx.strokeStyle = P.gold; ctx.lineWidth = 7; ctx.beginPath();
    ctx.arc(s.x + 92, s.y + 88, 52, -Math.PI / 2, -Math.PI / 2 + frac * Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,.55)';
    for (let i = 0; i < 3; i++) { const sx = s.x + 74 + i * 18, sy = s.y + 30 - ((w.popups.length * 7 + i * 9) % 14);
      ctx.beginPath(); ctx.ellipse(sx, sy, 5, 9, 0, 0, Math.PI * 2); ctx.fill(); }
    text(ctx, 'cooking…', s.x + 92, s.y + 160, 16, '#ffd98a', 'center', true, 'Verdana, sans-serif');
  } else if (nextIsCook) {
    text(ctx, 'next step: the pan!', s.x + 92, s.y + 160, 16, '#ffd98a', 'center', true, 'Verdana, sans-serif');
  } else {
    text(ctx, 'the quiet pan', s.x + 92, s.y + 160, 15, '#a68a76', 'center', false, 'Verdana, sans-serif');
  }
  text(ctx, 'PANTRY STOVE', s.x + 238, s.y + 160, 13, '#a68a76', 'center', true, 'Verdana, sans-serif');
  if (nextIsCook && !cooking) { ctx.strokeStyle = P.gold; ctx.lineWidth = 3; rr(ctx, s.x + 6, s.y + 6, s.w - 12, s.h - 12, 10); ctx.stroke(); }
}

function drawPlate(ctx, w) {
  const { x, y } = L.plate;
  const o = selectedOrder(w);
  ctx.fillStyle = 'rgba(0,0,0,.18)'; ctx.beginPath(); ctx.ellipse(x, y + 26, 190, 30, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fdfaf2'; ctx.beginPath(); ctx.ellipse(x, y, 180, 52, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = P.cardEdge; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(x, y, 180, 52, 0, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.ellipse(x, y, 138, 36, 0, 0, Math.PI * 2); ctx.stroke();
  if (!o) { text(ctx, 'pick an order card to start plating', x, y - 84, 19, P.softInk, 'center'); return; }
  text(ctx, `Now plating: ${o.recipe.name}`, x, 268, 21, P.ink, 'center', true);
  // step chips
  const steps = o.recipe.steps;
  const chipW = 44, totalW = steps.length * chipW + (steps.length - 1) * 8;
  let cx = x - totalW / 2;
  steps.forEach((st, i) => {
    const done = i < w.plate.length, cur = i === w.plate.length;
    ctx.fillStyle = done ? P.sage : cur ? '#fff' : '#efe3cd';
    rr(ctx, cx, 282, chipW, 40, 9); ctx.fill();
    ctx.strokeStyle = cur ? P.terra : P.cardEdge; ctx.lineWidth = cur ? 3 : 1.5; rr(ctx, cx, 282, chipW, 40, 9); ctx.stroke();
    if (st === 'cook') text(ctx, 'cook', cx + chipW / 2, 302, 13, done ? '#fff' : P.terraDark, 'center', true, 'Verdana, sans-serif');
    else drawIngredientIcon(ctx, st, cx + chipW / 2, 302, 13);
    if (done) text(ctx, '✓', cx + chipW - 9, 291, 12, '#fff', 'center', true, 'Verdana, sans-serif');
    cx += chipW + 8;
  });
  // ingredients resting on the plate
  const placed = w.plate.filter((s) => s !== 'cook');
  placed.forEach((id, i) => {
    const cols = 5, px = x - 104 + (i % cols) * 52, py = y - 12 + Math.floor(i / cols) * 30;
    drawIngredientIcon(ctx, id, px, py, 21);
  });
  if (w.plate.includes('cook')) text(ctx, 'fresh off the pan', x, y + 44, 14, P.terraDark, 'center', false);
  if (plateComplete(w)) text(ctx, 'ready to serve — press Enter or SERVE', x, y - 84, 19, P.sageDark, 'center', true);
}

function drawOrderCard(ctx, w, o, i) {
  const c = L.card(i);
  const sel = o.id === w.selectedId;
  ctx.fillStyle = sel ? '#fffdf6' : P.paper;
  rr(ctx, c.x, c.y, c.w, c.h, 12); ctx.fill();
  ctx.strokeStyle = sel ? P.terra : P.cardEdge; ctx.lineWidth = sel ? 3.5 : 1.5;
  rr(ctx, c.x, c.y, c.w, c.h, 12); ctx.stroke();
  const mood = o.patience / o.patienceMax < 0.25 ? 'sad' : 'ok';
  drawFace(ctx, o.person, c.x + 56, c.y + 58, 36, mood);
  ctx.fillStyle = o.person.shirt; rr(ctx, c.x + 22, c.y + 100, 68, 34, 8); ctx.fill();
  text(ctx, o.person.name, c.x + 116, c.y + 30, 21, P.ink, 'left', true);
  text(ctx, o.person.role + ' · still at the office', c.x + 116, c.y + 54, 14, P.softInk, 'left');
  text(ctx, o.recipe.name, c.x + 116, c.y + 82, 17, P.terraDark, 'left', true);
  text(ctx, '$' + o.recipe.price, c.x + c.w - 18, c.y + 30, 20, P.sageDark, 'right', true, 'Verdana, sans-serif');
  // mini step icons
  o.recipe.steps.forEach((st, si) => {
    const ix = c.x + 116 + si * 30, iy = c.y + 112;
    if (st === 'cook') text(ctx, 'cook', ix + 10, iy, 10, P.terraDark, 'center', true, 'Verdana, sans-serif');
    else drawIngredientIcon(ctx, st, ix + 10, iy, 10);
  });
  // patience bar
  const frac = Math.max(0, o.patience / o.patienceMax);
  ctx.fillStyle = '#e8dcc4'; rr(ctx, c.x + 116, c.y + 128, c.w - 134, 9, 4); ctx.fill();
  ctx.fillStyle = frac < 0.25 ? P.danger : frac < 0.55 ? '#e8a13c' : P.sage;
  if (frac > 0) { rr(ctx, c.x + 116, c.y + 128, (c.w - 134) * frac, 9, 4); ctx.fill(); }
}

function drawBins(ctx, w) {
  INGREDIENTS.forEach((ing, i) => {
    const b = L.bin(i);
    ctx.fillStyle = '#96683e'; rr(ctx, b.x, b.y, b.w, b.h, 10); ctx.fill();
    ctx.fillStyle = '#a97a4b'; rr(ctx, b.x + 5, b.y + 5, b.w - 10, b.h - 46, 8); ctx.fill();
    drawIngredientIcon(ctx, ing.id, b.x + b.w / 2, b.y + 44, 27);
    text(ctx, ing.name, b.x + b.w / 2, b.y + b.h - 24, 14.5, '#ffefd6', 'center', true, 'Verdana, sans-serif');
    ctx.fillStyle = 'rgba(0,0,0,.3)'; rr(ctx, b.x + b.w / 2 - 13, b.y + b.h - 15, 26, 15, 4); ctx.fill();
    text(ctx, ing.key, b.x + b.w / 2, b.y + b.h - 7, 11, '#ffd98a', 'center', true, 'Verdana, sans-serif');
  });
}

function drawButtons(ctx, w) {
  const btn = (r, label, fill, col, enabled = true) => {
    ctx.fillStyle = enabled ? fill : '#cbbfa5'; rr(ctx, r.x, r.y, r.w, r.h, 12); ctx.fill();
    ctx.strokeStyle = P.ink; ctx.lineWidth = 2; rr(ctx, r.x, r.y, r.w, r.h, 12); ctx.stroke();
    text(ctx, label, r.x + r.w / 2, r.y + r.h / 2, 21, enabled ? col : '#8a7a68', 'center', true, 'Verdana, sans-serif');
  };
  const step = selectedOrder(w)?.recipe.steps[w.plate.length];
  btn(L.cookBtn, w.cooking > 0 ? `COOKING ${Math.ceil(w.cooking)}…` : 'COOK  (C)', P.terra, '#fff', step === 'cook' && w.cooking === 0);
  btn(L.serveBtn, 'SERVE  (Enter)', P.sage, '#fff', plateComplete(w));
  btn(L.trashBtn, 'SCRAP LAST', '#e8dcc4', P.ink, w.plate.length > 0 && w.cooking === 0);
}

function drawHUD(ctx, w) {
  ctx.fillStyle = P.ink; ctx.fillRect(0, 0, 1280, 64);
  text(ctx, 'The Quiet Pantry', 20, 32, 25, P.cream, 'left', true);
  text(ctx, `Day ${w.day}`, 330, 32, 19, P.lamp, 'left', true, 'Verdana, sans-serif');
  text(ctx, `$${w.coins}`, 440, 32, 19, '#fff', 'left', true, 'Verdana, sans-serif');
  text(ctx, `served ${w.served}`, 540, 32, 16, '#d9c6ae', 'left', false, 'Verdana, sans-serif');
  if (w.combo >= 2) text(ctx, `combo x${w.combo}`, 660, 32, 16, P.gold, 'left', true, 'Verdana, sans-serif');
  // shift timer
  const frac = Math.max(0, w.timeLeft / 150);
  ctx.fillStyle = '#5a463c'; rr(ctx, 790, 22, 210, 20, 9); ctx.fill();
  ctx.fillStyle = frac < 0.2 ? P.danger : P.sage; if (frac > 0) { rr(ctx, 790, 22, 210 * frac, 20, 9); ctx.fill(); }
  const mm = Math.floor(w.timeLeft / 60), ss = Math.floor(w.timeLeft % 60).toString().padStart(2, '0');
  text(ctx, `${mm}:${ss} left`, 895, 54, 12.5, '#d9c6ae', 'center', false, 'Verdana, sans-serif');
  // toggles
  ctx.fillStyle = w.calm ? P.sage : '#5a463c'; rr(ctx, L.calmBtn.x, L.calmBtn.y, L.calmBtn.w, L.calmBtn.h, 9); ctx.fill();
  text(ctx, w.calm ? 'CALM: ON' : 'CALM: OFF', L.calmBtn.x + L.calmBtn.w / 2, 32, 14.5, '#fff', 'center', true, 'Verdana, sans-serif');
  ctx.fillStyle = '#5a463c'; rr(ctx, L.muteBtn.x, L.muteBtn.y, L.muteBtn.w, L.muteBtn.h, 9); ctx.fill();
  text(ctx, w.muted ? '♪̸' : '♪', L.muteBtn.x + L.muteBtn.w / 2, 32, 19, '#fff', 'center', true, 'Verdana, sans-serif');
}

function drawTitle(ctx, w) {
  drawKitchen(ctx, w);
  ctx.fillStyle = 'rgba(43,29,22,.45)'; ctx.fillRect(0, 0, 1280, 720);
  ctx.fillStyle = P.paper; rr(ctx, 290, 92, 700, 520, 22); ctx.fill();
  ctx.strokeStyle = P.terra; ctx.lineWidth = 4; rr(ctx, 290, 92, 700, 520, 22); ctx.stroke();
  text(ctx, 'The Quiet Pantry', 640, 168, 58, P.ink, 'center', true);
  text(ctx, 'a cozy cooking game for after-hours appetites', 640, 214, 20, P.terraDark, 'center');
  text(ctx, 'The meetings ran long. Your coworkers are tired and hungry.', 640, 268, 18, P.softInk, 'center');
  text(ctx, 'Cook them something warm. No shouting, no rush — unless you want it.', 640, 296, 18, P.softInk, 'center');
  // a plated dish, drawn large
  ctx.fillStyle = '#fdfaf2'; ctx.beginPath(); ctx.ellipse(640, 386, 120, 34, 0, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = P.cardEdge; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(640, 386, 120, 34, 0, 0, Math.PI * 2); ctx.stroke();
  drawIngredientIcon(ctx, 'salmon', 592, 376, 26);
  drawIngredientIcon(ctx, 'avocado', 646, 380, 22);
  drawIngredientIcon(ctx, 'greens', 690, 372, 20);
  drawIngredientIcon(ctx, 'rice', 640, 396, 22);
  ctx.fillStyle = P.sage; rr(ctx, L.playBtn.x, L.playBtn.y, L.playBtn.w, L.playBtn.h, 14); ctx.fill();
  ctx.strokeStyle = P.ink; ctx.lineWidth = 2.5; rr(ctx, L.playBtn.x, L.playBtn.y, L.playBtn.w, L.playBtn.h, 14); ctx.stroke();
  text(ctx, 'START THE EVENING', 640, L.playBtn.y + 38, 24, '#fff', 'center', true, 'Verdana, sans-serif');
  text(ctx, 'Calm Mode available in game — patience flows slowly and nobody leaves hungry.', 640, 578, 15, P.softInk, 'center');
}

function drawSummary(ctx, w) {
  drawKitchen(ctx, w);
  ctx.fillStyle = 'rgba(43,29,22,.45)'; ctx.fillRect(0, 0, 1280, 720);
  ctx.fillStyle = P.paper; rr(ctx, 340, 110, 600, 500, 22); ctx.fill();
  ctx.strokeStyle = P.terra; ctx.lineWidth = 4; rr(ctx, 340, 110, 600, 500, 22); ctx.stroke();
  text(ctx, `Day ${w.day} at the pantry — done`, 640, 168, 34, P.ink, 'center', true);
  const stars = summaryStars(w);
  for (let i = 0; i < 3; i++) text(ctx, i < stars ? '★' : '☆', 590 + i * 50, 222, 40, P.gold, 'center', true, 'Verdana, sans-serif');
  const rows = [
    ['Coworkers fed', String(w.dayServed)],
    ['Orders missed', String(w.dayMissed)],
    ['Coins earned today', '$' + w.dayCoins],
    ['Best combo', 'x' + Math.max(1, w.bestCombo)],
    ['Pantry till (all days)', '$' + w.coins],
  ];
  rows.forEach(([k, v], i) => {
    text(ctx, k, 420, 286 + i * 42, 20, P.softInk, 'left');
    text(ctx, v, 860, 286 + i * 42, 20, P.ink, 'right', true, 'Verdana, sans-serif');
  });
  text(ctx, w.dayMissed === 0 ? 'Everyone went home fed. The office hums a little softer tonight.' : 'Tomorrow is another evening. The kettle is already on.', 640, 500 - 14, 16.5, P.terraDark, 'center');
  ctx.fillStyle = P.sage; rr(ctx, L.nextBtn.x, L.nextBtn.y, L.nextBtn.w, L.nextBtn.h, 14); ctx.fill();
  ctx.strokeStyle = P.ink; ctx.lineWidth = 2.5; rr(ctx, L.nextBtn.x, L.nextBtn.y, L.nextBtn.w, L.nextBtn.h, 14); ctx.stroke();
  text(ctx, `START DAY ${w.day + 1}`, 640, L.nextBtn.y + 34, 22, '#fff', 'center', true, 'Verdana, sans-serif');
}

function drawPause(ctx) {
  ctx.fillStyle = 'rgba(43,29,22,.45)'; ctx.fillRect(0, 0, 1280, 720);
  ctx.fillStyle = P.paper; rr(ctx, 340, 300, 600, 120, 22); ctx.fill();
  ctx.strokeStyle = P.terra; ctx.lineWidth = 4; rr(ctx, 340, 300, 600, 120, 22); ctx.stroke();
  text(ctx, 'Paused — press P to resume', 640, 360, 30, P.ink, 'center', true);
}

export function render(ctx, w) {
  ctx.save();
  if (w.shake > 0) ctx.translate((Math.sin(w.shake * 60) * 4), 0);
  if (w.mode === 'title') { drawHUD(ctx, { ...w, timeLeft: 150 }); drawTitle(ctx, w); ctx.restore(); return; }
  if (w.mode === 'summary') { drawHUD(ctx, w); drawSummary(ctx, w); ctx.restore(); return; }
  drawKitchen(ctx, w);
  drawStove(ctx, w);
  drawPlate(ctx, w);
  w.orders.forEach((o, i) => drawOrderCard(ctx, w, o, i));
  if (!w.orders.length) {
    ctx.fillStyle = P.paper; rr(ctx, 16, 76, 400, 148, 12); ctx.fill();
    text(ctx, 'the pantry is quiet… someone will wander in soon', 216, 150, 16, P.softInk, 'center');
  }
  drawBins(ctx, w);
  drawButtons(ctx, w);
  drawHUD(ctx, w);
  for (const p of w.popups) {
    ctx.globalAlpha = Math.max(0, 1 - p.t / 1.6);
    text(ctx, p.text, p.x, p.y, 19, p.color, 'center', true, 'Verdana, sans-serif');
    ctx.globalAlpha = 1;
  }
  if (w.paused) drawPause(ctx);
  ctx.restore();
}
