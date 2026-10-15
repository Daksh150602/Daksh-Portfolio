# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev`: Vite dev server, run with `--host` so it is reachable on the LAN (default http://localhost:5173)
- `npm run build`: `tsc -b && vite build`. Type errors fail the build (`strict`, `noUnusedLocals` and `noUnusedParameters` are on in `tsconfig.app.json`).
- `npm run lint`: ESLint (flat config in `eslint.config.js`)
- `npm run preview`: serves the built `dist/`

There is no test suite. The root `test.js` is a stray scratch file, not part of the app or the build. Check changes with `npm run build`, then look at them in the browser.

## Architecture

This is a single-page personal portfolio: React 18, TypeScript and Vite. A hand-rolled Three.js character scene sits next to GSAP scroll animations. Most behavior comes from imperative GSAP and Three.js code that targets DOM class names, not from React state.

### Boot / loading flow (spans several files)
1. `App.tsx` lazy-loads `MainContainer` and `Character` inside `LoadingProvider` (`src/context/LoadingProvider.tsx`). That provider renders the `Loading` overlay while `isLoading` is true.
2. `Character/Scene.tsx` builds a raw `THREE.WebGLRenderer`. It does **not** use R3F `<Canvas>`. It calls `setProgress()` from `Loading.tsx` to fake progress up to about 91%. When the model finishes loading, `progress.loaded()` runs the bar to 100%.
3. At 100%, `Loading.tsx` dynamically imports `utils/initialFX.ts`. `initialFX` unpauses the `ScrollSmoother`, enables body scroll, runs the landing SplitText intro animations and calls `setIsLoading(false)`.

### 3D character
- The model ships encrypted at `public/models/character.enc`, which is AES-256-CBC with a 16-byte IV prefix. `Character/utils/decrypt.ts` decrypts it in the browser with WebCrypto, and the result goes to `GLTFLoader` with Draco (decoder in `public/draco/`). `public/models/encrypt.cjs` produces the `.enc` file from `character.glb`. The password in `encrypt.cjs` has to match the one passed in `Character/utils/character.ts`, and right now the two differ. Check both before re-encrypting a model. Bump the `?v=` query in `character.ts` to bust the cache.
- `character.ts` overrides materials on specific meshes by name (`BODY.SHIRT`, `Pant`). Once the model is loaded, it calls `setCharTimeline` and `setAllTimeline` from `components/utils/GsapScroll.ts`.
- Several files depend on names inside the GLTF: bones (`spine006` head, `spine005` neck, `footL/R`), objects (`screenlight`, `Plane004`, material `Material.018` monitor) and animation clips (`introAnimation`, `Blink`, `key1/2/5/6`, `typing`, `browup`). Bone subsets for partial animations are in `src/data/boneData.ts`. Swapping the model breaks these lookups.
- Mouse and touch head-tracking live in `Character/utils/mouseUtils.ts`. Resize handling lives in `resizeUtils.ts`.

### Scroll & animation system
- GSAP is the standard `gsap` package, and the formerly paid plugins `ScrollSmoother` and `SplitText` come from it. Do not reintroduce `gsap-trial`. SplitText typings are in `src/types/gsap-splittext.d.ts`.
- `Navbar.tsx` creates the global `ScrollSmoother` (`#smooth-wrapper` / `#smooth-content`) and exports it as `smoother`. Other modules import it from there. On desktop, nav links scroll through `smoother.scrollTo(data-href)`.
- `GsapScroll.ts` holds ScrollTrigger timelines that move both the 3D objects (camera position, character rotation, monitor opacity) and DOM sections. It selects them by class: `.landing-section`, `.about-section`, `.whatIDO`, `.character-model`, `.career-*`, `.what-box-in` and others. Renaming a CSS class in a section component can silently break these animations.
- `utils/splitText.ts` animates every `.para` and `.title` element on scroll. `MainContainer` re-runs it on resize, and it is skipped below 900px.

### Responsive split
The 1024px breakpoint is hard-coded in several places: `MainContainer`, `GsapScroll` and `Navbar`. Above 1024px the character renders as a fixed sibling of the scroll content, the scroll timelines drive it, and `TechStack` (a lazy-loaded R3F + Rapier physics scene) is shown. At 1024px and below the character renders inside `Landing`, and `TechStack` is not rendered at all.

### Content
Section components in `src/components/` (`About`, `Career`, `Work`, etc.) hard-code their own copy and data. For example, the `projects` array is in `Work.tsx`. Each section has a stylesheet in `src/components/styles/`. Images and tech icons are in `public/images/`.
