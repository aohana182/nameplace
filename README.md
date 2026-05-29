# NamePlace

> Pin the people you meet to the places you meet them.

NamePlace is a map-based personal contact memory app. Drop a pin where you met someone — the barista, the networking contact, the neighbor — and never blank on a name again.

**Live app:** https://nameplace.lovable.app

---

## Features

- **Map pins** — tap any location to drop a pin and attach a person's details
- **Contact tagging** — organize and search the people pinned to your map
- **Auth** — sign in with Google via Supabase
- **Private** — data stored in your own Supabase project, not shared

## Tech stack

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) — build tooling
- [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- [Leaflet](https://leafletjs.com) — interactive maps
- [Supabase](https://supabase.com) — auth and database

## Local development

```sh
git clone https://github.com/aohana182/nameplace.git
cd nameplace
npm install
cp .env.example .env   # fill in your Supabase project values
npm run dev
```

Open http://localhost:5173.

## Environment variables

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key |
| `VITE_SUPABASE_PROJECT_ID` | Supabase project ID |

Copy `.env.example` and fill in values from your [Supabase project settings](https://supabase.com/dashboard).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run test` | Run test suite |
| `npm run lint` | Run ESLint |
