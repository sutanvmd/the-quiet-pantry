# The Quiet Pantry

A cozy cooking game for after-hours appetites — an entry for the make.fun bounty
[Make the best cooking game](https://make.fun/bounty/best-cooking-game-20261125-0137).

![Competition](https://make.fun/badge/best-cooking-game-20261125-0137.svg)
![Rank](https://make.fun/badge/best-cooking-game-20261125-0137/sutanvmd/the-quiet-pantry/rank.svg)
![Reward](https://make.fun/badge/best-cooking-game-20261125-0137/sutanvmd/the-quiet-pantry/reward.svg)

## The game

The meetings ran long. Your coworkers are tired, hungry, and still at the
office — so you open the pantry and cook them something warm. Built for
white-collar players: a calm evening shift, generous patience, and a Calm Mode
where nobody storms off hungry.

- **Order board** — up to three coworkers at a time, each with a dish, a price,
  and a patience bar.
- **Build step by step** — click ingredient bins (or keys 1–0) to plate a dish
  in recipe order; some steps go through the pan (C to cook, watch the ring).
- **Serve and earn** — faster serves earn bigger tips; streaks build a combo.
- **Day loop** — a 150-second evening shift, a day summary with stars, then a
  busier next day.
- **Calm Mode** — patience drains slowly and nobody leaves; dinner, not stress.

Eight original comfort dishes (Salmon Rice Bowl, Quiet Night Ramen, Herb
Omelette, Caprese Panini…), ten ingredients, eight coworkers — all art drawn in
canvas, all sound synthesized with WebAudio. No assets, no network: it runs
offline from static files in a desktop browser.

## Run it

```sh
node main.ts            # writes game/, screenshots/, dossier.json to /output
```

To play locally, serve the `game/` folder with any static file server and open
`index.html`. Staged screenshot scenes live at `?shot=start|rush|serve|summary&seed=1`.

## Layout

- `main.ts` — the entry program: copies the game to the output directory and
  writes `dossier.json` with the vendored make.fun library.
- `game/` — the game itself (plain HTML + ES modules, no dependencies).
- `screenshots/` — four renders of the real game.
- `vendor/makefun-game.ts` — the kit's library, unmodified.

MIT licensed.
