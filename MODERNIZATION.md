# Bookio modernization (branch `modernize-2026`)

Goal (owner request, 2026-10-21): update the app "using the latest technology and
components" while preserving the book-sharing features and visual design.

## Stack: before -> after

| Area | 2019 | Now |
| --- | --- | --- |
| Build | react-scripts 2 (CRA, webpack 4) | Vite 6 |
| React | 16.8 | 18 (createRoot, no class components left to add) |
| Routing | react-router-dom v4 (Switch, withRouter, history props) | react-router-dom v7 (Routes, hooks) |
| Firebase | JS SDK v5 namespaced | v11 modular (tree-shaken), same facade methods |
| State | redux + redux-thunk, hand-wired store | Redux Toolkit configureStore (thunk built in) |
| Search | algoliasearch v3 | algoliasearch v5 |
| Maps | react-google-maps, google-maps-react, react-google-autocomplete | @vis.gl/react-google-maps |
| Styling | node-sass 4 (node-gyp, dead) | dart-sass |
| Icons | Font Awesome 5 | Font Awesome 6 (same icon names) |
| Dead deps dropped | recompose, react-addons-css-transition-group, react-media, axios, numeral, lodash, react-geocode, @google-cloud/storage, uuid, babel 6 | native/fetch/Intl/crypto.randomUUID or small hooks |

Compatibility facades keep call-site churn low:
- `src/firebase` exposes the same `Firebase` class methods (`doSignIn...`, `user(uid)`,
  `books()`, ...) implemented on the modular SDK; `src/components/Firebase` re-exports it.
- Env vars move from `REACT_APP_*` to `VITE_*` (see `.env.example`).

## Security notes (pre-existing, flagged not silently changed)

1. **Algolia admin key in the browser.** `src/components/Algolia` used
   `REACT_APP_ALGOLIA_API_KEY` with `setSettings`/`saveObject` from client code - anyone
   could read it from the bundle and rewrite the index. The port uses a search-only key
   (`VITE_ALGOLIA_SEARCH_KEY`); client-side `saveObject` is kept for parity but marked for
   removal. Proper fix: server-side indexing (Firestore trigger / extension) or dropping
   Algolia for Firestore queries.
2. Firebase client config is public by design; Google Maps key should stay
   HTTP-referrer restricted.

## Status (work in progress)

Done:
- [x] Tooling: Vite config, index.html, package.json deps, .env.example
- [x] Firebase facade on modular v11 (auth, firestore, storage, Algolia sync listener)
- [x] Algolia v5 wrapper
- [x] Redux Toolkit store (reducers/actions unchanged)
- [x] Session HOCs -> hook-based (withAuthentication/withAuthorization/withEmailVerification)
- [x] Root: main.jsx with createRoot + Routes v7

- [x] recompose removed everywhere (hooks + plain composition)
- [x] withRouter/history/match props -> useNavigate/useParams in all pages and
      components
- [x] GoogleMap + AddNewBookPage ported to @vis.gl/react-google-maps
      (Map/Marker/places Autocomplete/geocoding library)
- [x] Search + BooksPage on algoliasearch v5 wrapper
- [x] react-addons-css-transition-group dropped (its transition classes were
      never styled, so behavior is unchanged); lodash dropped
- [x] CRA entry src/index.js deleted; SCSS @import kept (deprecation warnings
      only, removal slated for Dart Sass 3)
- [x] React 19 migration catch: defaultProps on function components
      (BrandLogo, Button, Loader, ItemInfo, GoogleMap) converted to default
      parameters - this had silently dropped the navbar brand logo
- [x] main.jsx route layout restored to the 2019 structure
      (WithNavbar/WithoutNavbar/WithFooter, .page-container wrapper)
- [x] Smoke tests with vitest (store slices, facade surface, routes): 7 passed
- [x] README: Vite dev setup, env vars, security notes
- [x] `npm run build` green (209 modules) and `npm test` green (7/7);
      desktop/mobile/login screenshots verified visually identical to the
      2019 deployment (brand logo, container layout, cards, auth pages)

- [x] Functional verification beyond smoke tests:
      - 16 unit/mock tests (npm test): store slices, facade surface, routes,
        Algolia v5 wrapper call mapping, GoogleMap vis.gl behavior (center,
        marker, click -> {lat, lon}, autocomplete gating), Search component
        (query -> algolia -> redux -> navigate, zero-hit path)
      - 7 emulator tests (npm run test:emulator, Firebase Emulator Suite
        auth/firestore/storage on localhost, no production data): auth
        lifecycle (create/sign-out/sign-in, wrong-password rejection,
        password rules, reset + verification mails), user doc CRUD, full
        book lifecycle mirroring the component call sequences (publish ->
        images -> myBooks -> request -> accept -> history assembly ->
        delete), Storage upload via the ported helper
      - Emulator requires Java 21+ (firebase-tools 15.x)
- [x] Mobile hero collision fixed (illustration overlapped banner buttons;
      now matches the shipped 2019 rendering)

Remaining before PR:
- [ ] Push branch to bt-s/BOOKIO and open PR (bulk route under
      investigation; lockfile stays IN the branch for reproducible installs)

Known unverified (needs the owner's real services, out of sandbox reach):
- Algolia index sync against a live index (wrapper signatures are
  unit-tested; the live index mapping is not)
- Google Maps rendering against the real JS API (component behavior tested
  with the library mocked)
- Facebook OAuth sign-in (provider popup flow unchanged from 2019, not
  exercised)

No merge, deploy or account changes without explicit approval.
