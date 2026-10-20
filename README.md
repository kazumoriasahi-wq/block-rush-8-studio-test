# BLOCK RUSH8 — STUDIO preview

Independent redesign. Original public version https://kazumoriasahi-wq.github.io/block-rush-8/ remains unchanged. Test URL: https://kazumoriasahi-wq.github.io/block-rush-8-studio-test/?lang=ja&v=studio1

## Play
8×8 board, three pieces per hand, no rotation, no timer. Drag with a lifted real-size ghost or select a piece and tap a cell. Keyboard1–3 selects, arrows/Enter places. Full rows/columns clear. Consecutive clearing moves build combos; a nonclear resets the combo. All remaining pieces blocked ends the game.

Base scoring is unchanged:10 per placed cell +15 per unique cleared cell +50×combo on a clear. Preview shows predicted gain, lines and next combo without changing state.

## Studio changes
- Calm ink/slate surfaces and satin colored tiles, stronger selected/invalid/clear-line previews.
- Classic refill simulates a legal sequence of all3 pieces before dealing. This guarantees at least one possible order at the time of refill, not that every player choice will remain solvable. Daily retains a board-independent seeded piece stream, shared by UTC date.
- Score ranks SEED→SPARK→FLOW→…→MASTER, then continuing50000-point goals. This is progress feedback, not extra score or purchasable advantage.
- Clear title outside the board, restrained particles/line sweeps, short placement animation, score/rank feedback, records and session mission summary.
- Original synthesized relaxed BGM and existing SFX. Sound starts after a gesture; BGM and global mute respect pause/host audio. BGM preference saved.
- Larger portrait board, hand and controls within tested390×844 and320×740 layouts; page can scroll on smaller viewports.
- Japanese/English, daily, session restore, host cloud/pause/audio adapter retained. New local storage key br8_studio_preview1 isolates all production saves.

## Validation
node tests.cjs; node studio-tests.cjs; node tests/platform-tests.cjs; node tests/drag-tests.cjs; node tests/sound-tests.cjs; node tests/locale-tests.cjs; node music-tests.cjs. Preview: BR8_PORT=4210 node serve.cjs.
Controlled clear fixture verified450→630/SPARK, preview+230 then actual860/combo2, mouse drag→870, records/missions. Phone iframe366px board at390width and300px board at320width, no horizontal overflow. Actual iPhone check pending owner. Test pages/setup scripts not shipped.

Existing SDK integration retained but new edition has not been formally certified or approved by YouTube. The application form was not changed. Backup: BLOCK-RUSH-official-before-studio.zip.
