import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";

const prisma = new PrismaClient();

type InterestArticle = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string;
  content: string;
  interest: string;
  coverImage: string;
  publishedAt: string;
};

const INTEREST_ARTICLES: InterestArticle[] = JSON.parse(
  readFileSync(new URL("./interest-articles.json", import.meta.url), "utf8")
);

const ARTICLES = [
  {
    slug: "from-broadcast-control-rooms-to-saas-dashboards",
    title: "From Broadcast Control Rooms to SaaS Dashboards",
    excerpt:
      "Live television is the harshest UX lab on earth. Here is what years around control rooms taught me about building software that people can trust under pressure.",
    coverImage: "/media/cover-broadcast.webp",
    tags: "Broadcast, Design Engineering, Reliability",
    interest: "craft",
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-07-02T09:00:00Z"),
    content: `
There is a moment in every live broadcast when something goes wrong. A source drops. A graphic misfires. A remote feed starts stuttering thirty seconds before air. What happens next depends almost entirely on one thing: whether the people in the control room can *see* the state of their world at a glance and act on it without thinking.

That environment shaped how I design software more than any course or design system ever did.

## Interfaces where failure is not an option

A broadcast gallery is a wall of state. Dozens of monitors, tally lights, audio meters, countdown clocks. Nothing on that wall is decorative — every pixel answers a question someone will ask in the next ninety seconds. When I started building SaaS dashboards, I carried that discipline with me:

- **Every element must answer a real question.** If nobody would miss it during an incident, it does not belong on the screen.
- **State must be visible, not discoverable.** A control room never hides the master fader behind a settings menu. Your app should not hide sync status behind three clicks.
- **Red means red.** Alarm colors are sacred. The moment you use red for a marketing badge, you have taught your users to ignore emergencies.

## Glanceability beats density

People assume control rooms are cluttered. They are actually ruthlessly economical: high-contrast type, consistent positions, information that stays where you left it. Operators build muscle memory — the same way your users do with a dashboard they open every morning.

The lesson for product design is that *layout stability is a feature*. Moving a button in a redesign has a real cost, paid in operator hesitation. In live TV that hesitation is measured in dead air. In your product it is measured in churn.

## Calm software

The best broadcast engineers I met shared a personality trait: they were calm, because their systems were calm. Alerts meant something. Automation was predictable. Fallbacks were rehearsed.

That is the quality I now chase in every product I build — what I call **calm software**:

1. Predictable latency. A spinner that always takes two seconds beats one that randomly takes ten.
2. Rehearsed failure. Error states are designed first, not last.
3. Honest progress. Never fake a progress bar. Operators always find out.

## The operator mindset

When I design a SaaS dashboard today, I do not picture "a user persona exploring features." I picture an operator, slightly tired, mid-task, with something else demanding their attention. If the interface serves that person, it serves everyone.

Broadcast taught me that reliability is not an engineering property bolted onto a design. It *is* the design. Everything else is set dressing.
`.trim(),
  },
  {
    slug: "cinematic-ux-motion-design-for-product-interfaces",
    title: "Cinematic UX: Bringing Motion Design Into Product Interfaces",
    excerpt:
      "Motion is not decoration — it is information about space, causality, and attention. A practical framework for using camera language in product design without hurting performance.",
    coverImage: "/media/cover-cinematic.webp",
    tags: "Cinematic UX, Motion, 3D",
    interest: "craft",
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-07-19T09:00:00Z"),
    content: `
The landing page you arrived through on this site is one continuous camera flight: five miniature worlds, one glide, no cuts. It is not a gimmick — it is a thesis. Motion, used with intent, is the most underused material in product design.

Most interfaces treat motion as garnish: a fade here, a bounce there. Film treats motion as *grammar*. Cameras establish, focus, and transition — and audiences read those moves fluently without being taught. We can borrow that fluency.

## The three camera moves of UI

Almost every meaningful interface animation maps to one of three film moves:

- **The establishing shot.** When a user lands somewhere new, give them geography before detail. A dashboard that fades in as one composition — then resolves into its widgets — is legible. One where twelve cards pop in randomly is noise.
- **The push-in.** Focus is a zoom, not a highlight. When a user opens a record from a table, the record should feel like a closer view of the same world, not a teleport to a different app.
- **The match cut.** Transitions carry identity. The thumbnail that grows into the detail view tells the user "this is the same object." That continuity is worth more than any breadcrumb.

## Easing is emotion

Linear motion feels mechanical; extreme spring physics feel like a toy. The craft is in choosing an easing curve that matches your product's temperament. My rule of thumb: business tools ease out fast and settle quietly. Creative tools can afford a little overshoot. Nothing in a professional product should wobble.

## Scroll as a timeline

Scroll-driven storytelling — the technique behind this site's flight — works because it hands the user the playhead. They control time, so motion never feels imposed. Three principles keep it honest:

1. **Scrubbing must be instant.** If the visual lags the wheel, the illusion collapses.
2. **Seams must be invisible.** Every transition point has to be frame-matched, or the world feels stitched.
3. **Reverse must work.** Users scroll up. Your story has to play backwards as gracefully as forwards.

## The performance budget

Cinematic UX dies the moment it costs frames. Every motion feature ships with a budget: no layout thrash, transforms and opacity only, and an escape hatch — under reduced-motion preferences the film becomes stills, and the story still reads.

That last point matters most. Motion should be a *layer* on top of meaning, never the carrier of it. If your interface stops making sense with animations off, you did not design motion — you designed dependency.

Cinema spent a century learning how to move a camera. Product design gets to inherit all of it, for free. We should.
`.trim(),
  },
  {
    slug: "building-medialinkpro-mapping-the-broadcast-industry",
    title: "Building MediaLinkPro: Mapping the Broadcast Technology Industry",
    excerpt:
      "The broadcast tech world is huge, fragmented, and documented mostly in exhibition-hall PDFs. A build log on turning NAB, IBC and Inter BEE floor knowledge into a living platform.",
    coverImage: "/media/cover-medialink.webp",
    tags: "MediaLinkPro, Build Log, Broadcast",
    interest: "craft",
    status: "PUBLISHED" as const,
    publishedAt: new Date("2026-08-05T09:00:00Z"),
    content: `
Walk the floor at NAB in Las Vegas, IBC in Amsterdam, or Inter BEE in Tokyo and you will pass thousands of companies whose products quietly run the world's television: routers, intercoms, playout servers, graphics engines, transmitters. Now try to find a single place that maps who they are, what they actually ship, and who they are hiring.

You will not find one. That gap is why I started building **MediaLinkPro**.

## The problem: institutional knowledge in PDF form

Broadcast is an industry where critical knowledge lives in exhibitor catalogs, trade-show booth conversations, and the heads of veteran engineers. When a chief engineer needs to replace an aging vision mixer, the research process looks the same as it did in 2005: ask around, collect brochures, email sales reps.

Meanwhile, every other industry got structured discovery platforms. Developers have package registries. Startups have product directories. Broadcast — a sector measured in tens of billions — kept the brochures.

## The shape of the data

The core of MediaLinkPro is a deliberately boring, deliberately strict data model:

- **Organizations** — the companies, from the giants to the two-person signal-processing shops.
- **Flagship products** — not the full catalog; the products a company would put on its booth banner. Curation is the feature.
- **Job postings** — because hiring signals are the most honest indicator of where the industry is actually heading.

The discipline is in what gets left out. Every directory that tries to capture everything becomes a swamp. One flagship product per company forces the question that matters: *what is this company actually about?*

## Lessons from building it solo

A few things this project keeps teaching me:

1. **Seed data is product design.** The first hundred companies define the tone of the whole platform. I sourced them from real exhibitor lists across the three major shows, then cleaned every entry by hand.
2. **Logos are surprisingly hard.** Square, legible, non-transparent, consistently lit — a real pipeline problem that no one warns you about.
3. **An empty directory is a broken promise.** A platform like this has to launch feeling inhabited, or it never gets a second visit.

## Where it is going

The near-term roadmap is focused: deeper company profiles, product comparisons that respect engineers' intelligence, and a jobs layer that treats broadcast careers as first-class. The long-term ambition is simpler to state: when someone in this industry asks "who makes X?", the answer should take ten seconds, not ten emails.

Broadcast gave me my start. MediaLinkPro is how I give the map back.
`.trim(),
  },
];

const PRODUCTS = [
  {
    slug: "medialinkpro",
    name: "MediaLinkPro",
    tagline: "The broadcast & media technology industry, mapped.",
    description:
      "A discovery platform for the broadcast world: organizations, their flagship products, and live job postings — sourced from the exhibitor floors of NAB, IBC and Inter BEE and curated by hand. Built for the engineers who keep television on air.",
    image: "/media/product-medialink.webp",
    link: null,
    accent: "#4FD1C5",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "socialroute",
    name: "SocialRoute",
    tagline: "Plan, schedule, and route your social content — everywhere.",
    description:
      "A social media command center: plan campaigns, generate captions, find the best posting slots, and schedule content across every platform from one calendar. The same tool that runs my own channels.",
    image: "/media/product-socialroute.webp",
    link: "https://socialroute.net",
    accent: "#E38FB8",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "tachkila",
    name: "Tachkila",
    tagline: "Football formations & squad lineups, beautifully simple.",
    description:
      "A lineup builder for football lovers, coaches and pundits: pick a formation, drag players into place, and share match-ready squad graphics in seconds. Built with TypeScript and a lot of matchday opinions.",
    image: "/media/product-tachkila.webp",
    link: "https://github.com/Karimaxapps/Tachkila",
    accent: "#6FBF73",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "qr-ordering",
    name: "QR Ordering Suite",
    tagline: "Scan, browse, order — contactless dining that just works.",
    description:
      "A restaurant ordering platform: guests scan a table QR code, browse a live menu, and order without waiting for staff. Real-time order flow to the kitchen, menu management for owners, zero app installs for guests.",
    image: "/media/product-qrorder.webp",
    link: null,
    accent: "#F0A860",
    featured: true,
    sortOrder: 4,
  },
  {
    slug: "archiinsert",
    name: "ArchiInsert",
    tagline: "Speed tooling for architectural drawing workflows.",
    description:
      "A lightweight JavaScript toolkit that automates the repetitive parts of architectural drafting — inserting, organizing and reusing drawing assets so architects spend their hours on design, not clicks.",
    image: "/media/product-archiinsert.webp",
    link: "https://github.com/Karimaxapps/ArchiInsert",
    accent: "#86AFF5",
    featured: true,
    sortOrder: 5,
  },
];

async function main() {
  for (const a of ARTICLES) {
    const words = a.content.split(/\s+/).filter(Boolean).length;
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { interest: a.interest },
      create: { ...a, readMinutes: Math.max(1, Math.round(words / 220)) },
    });
  }
  for (const a of INTEREST_ARTICLES) {
    const words = a.content.split(/\s+/).filter(Boolean).length;
    await prisma.article.upsert({
      where: { slug: a.slug },
      update: { interest: a.interest },
      create: {
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
        tags: a.tags,
        content: a.content,
        interest: a.interest,
        coverImage: a.coverImage,
        status: "PUBLISHED",
        publishedAt: new Date(a.publishedAt),
        readMinutes: Math.max(1, Math.round(words / 220)),
      },
    });
  }
  for (const p of PRODUCTS) {
    await prisma.product.upsert({
      where: { slug: p.slug },
      // keep admin edits, but sync ordering so seeded row positions stay canonical
      update: { sortOrder: p.sortOrder },
      create: p,
    });
  }
  const [articles, products] = await Promise.all([
    prisma.article.count(),
    prisma.product.count(),
  ]);
  console.log(`Seeded. Articles: ${articles}, Products: ${products}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
