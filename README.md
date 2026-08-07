# karimlazaar.com — personal world

Karim Lazaar's personal site: a scroll-scrubbed cinematic landing page ("one continuous
flight" through five clay-diorama islands), an articles publishing system, and a flagship
products showcase.

**Stack:** Next.js 16 (App Router, TypeScript, Tailwind v4) · Prisma 6 · MySQL 8.4 · a
self-contained vanilla-JS scroll-scrub engine ([src/lib/scrub-engine.js](src/lib/scrub-engine.js)).

## Run it

1. **Database** — a Docker container is expected on port **3321**:

   ```bash
   docker start karimax-mysql
   ```

   (First-time setup: `docker run -d --name karimax-mysql -e MYSQL_ROOT_PASSWORD=karimax_dev_2026 -e MYSQL_DATABASE=karimax_site -p 3321:3306 mysql:8.4`,
   then `npx prisma migrate dev` and `npx prisma db seed`.)

2. **Env** — copy [.env.example](.env.example) to `.env` and fill in. `ADMIN_PASSWORD`
   is the `/admin` login; `ADMIN_SECRET` signs the session cookie.

3. **Dev server**:

   ```bash
   npm run dev
   ```

## Publishing articles

Go to `/admin` (link in the footer), sign in with `ADMIN_PASSWORD`, and use the
publishing desk. Articles are Markdown; the Published checkbox controls visibility;
slugs and read-time are derived automatically. Products (name, tagline, description,
image, link, accent color) are managed the same way.

## The film (landing page)

- `public/world/leg_0..3.mp4` — four 8s camera legs (Higgsfield `veo3_1_lite`, 720p).
  Each leg was generated with `start_image` = island *i*'s still and `end_image` =
  island *i+1*'s still, so every seam is frame-anchored. `-m.mp4` variants (tighter
  GOP) are served to phones automatically.
- `public/world/still_0..4.webp` — posters extracted from the **actual video frames**
  (zero flash when the clip takes over). `still_4` is the film's final frame; section 5
  is a "living still" with the CTA.
- Config lives in [src/lib/world.ts](src/lib/world.ts) (copy, accents, pacing:
  `scroll`, `ease: "dwell"`, `copyPeak`).
- Scene stills were generated with gpt-image-2 via the Codex CLI; encoding used ffmpeg
  (`-g 8 -crf 20 +faststart`, no audio). The engine loads clips as Blobs, so scrubbing
  never depends on HTTP range support.

## Deploy notes

- `npm run build` / `npm start`; needs `DATABASE_URL` pointing at a production MySQL.
- The film assets are ~14 MB total in `public/world` — keep them on the same origin
  (the engine fetches them as blobs).
- Set `SITE_URL` for correct Open Graph URLs.
