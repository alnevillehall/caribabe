# Go Bjoun

Go Bjoun is a premium Caribbean travel discovery experience. Its Jamaica beta
combines 160 community-mapped beaches, nature sites, cultural destinations,
restaurants, nightlife venues, stays, and adventures with an interactive map,
search, filters, place details, directions, and device-local saves.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm test
npm run build:vercel
```

## Refreshing open location data

```bash
npm run data:refresh
```

Place data is sourced from OpenStreetMap contributors under ODbL. Map rendering
uses OpenFreeMap and MapLibre. See `LAUNCH_CHECKLIST.md` for the production
handoff and future booking integration requirements.
