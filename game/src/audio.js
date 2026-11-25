// Tiny synthesized sound set — soft kitchen pops and chimes, no audio files.
// The context is created lazily on the first user gesture; in staged
// screenshot scenes nothing is ever played.
let ctx = null;
let muted = false;

export function setMuted(m) { muted = m; }
export function isMuted() { return muted; }

function ac() {
  if (typeof window === 'undefined') return null;
  if (!ctx) { try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch { ctx = null; } }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, dur, type = 'sine', gain = 0.05, when = 0, slide = 0) {
  if (muted) return;
  const a = ac(); if (!a) return;
  const t0 = a.currentTime + when;
  const osc = a.createOscillator(); const g = a.createGain();
  osc.type = type; osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(a.destination);
  osc.start(t0); osc.stop(t0 + dur + 0.05);
}

export const sfx = {
  add()    { tone(520, 0.07, 'triangle', 0.045); },
  cook()   { tone(180, 0.3, 'sawtooth', 0.015, 0, 60); },
  cooked() { tone(740, 0.1, 'sine', 0.05); tone(988, 0.14, 'sine', 0.045, 0.07); },
  serve()  { tone(659, 0.1, 'sine', 0.05); tone(784, 0.1, 'sine', 0.05, 0.08); tone(1047, 0.18, 'sine', 0.05, 0.16); },
  trash()  { tone(240, 0.09, 'square', 0.025, 0, -90); },
  pop()    { tone(880, 0.06, 'sine', 0.04); },
  sad()    { tone(392, 0.16, 'sine', 0.04); tone(330, 0.22, 'sine', 0.04, 0.12); },
  day()    { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.16, 'triangle', 0.05, i * 0.11)); },
};
