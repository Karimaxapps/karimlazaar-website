import Link from "next/link";
import ScrollWorld from "@/components/ScrollWorld";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/slug";

export const dynamic = "force-dynamic";

// Real product logos served from public/media (downloaded from the live sites).
const FLAGSHIP_LOGOS: Record<string, string> = {
  medialinkpro: "/media/logo-medialinkpro.webp",
  socialroute: "/media/logo-socialroute.svg",
};

export default async function Home() {
  const [articles, products] = await Promise.all([
    prisma.article.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.product.findMany({
      where: { featured: true },
      orderBy: { sortOrder: "asc" },
      take: 4,
    }),
  ]);

  return (
    <>
      <ScrollWorld />

      {/* Grounded content after the flight */}
      <section className="after-film">
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "90px clamp(18px,5vw,48px) 70px" }}>
          <span className="eyebrow">After the flight</span>
          <h2 className="page-title" style={{ fontSize: "clamp(1.8rem,3.6vw,2.6rem)" }}>
            The ground floor.
          </h2>
          <p className="page-lead">
            Everything in the world above is real: the products in the foundry, the
            writing in the library, the story in the control room. Here it is in plain form.
          </p>

          <h3 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, margin: "56px 0 18px", fontSize: "1.25rem" }}>
            What I can do for you
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 18 }}>
            {[
              { name: "AI Expertise & Solutions", img: "/media/service-ai.webp", accent: "#8B7CF6", line: "The latest, most powerful AI tools — applied where they pay off." },
              { name: "Web & App Development", img: "/media/service-webdev.webp", accent: "#4FD1C5", line: "End-to-end product development, from sketch to running system." },
              { name: "Personalized Solutions", img: "/media/service-custom.webp", accent: "#F0A860", line: "Bespoke systems fitted to how your business actually works." },
            ].map((s) => (
              <Link key={s.name} href="/services" className="card" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt="" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }} />
                <div style={{ padding: 20 }}>
                  <div style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.06rem", color: s.accent }}>
                    {s.name}
                  </div>
                  <div style={{ color: "var(--site-ink-soft)", fontSize: "0.92rem", marginTop: 8, lineHeight: 1.55 }}>
                    {s.line}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {products.length > 0 && (
            <>
              <h3 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, margin: "56px 0 18px", fontSize: "1.25rem" }}>
                Flagship products
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 22, maxWidth: 900 }}>
                {products.map((p) => {
                  const logo = FLAGSHIP_LOGOS[p.slug];
                  const domain = p.link ? new URL(p.link).hostname.replace(/^www\./, "") : null;
                  const accent = p.accent ?? "#8b7cf6";
                  return (
                    <a
                      key={p.id}
                      href={p.link ?? "/products"}
                      target={p.link ? "_blank" : undefined}
                      rel="noreferrer"
                      className="card"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        display: "block",
                        borderColor: `color-mix(in srgb, ${accent} 38%, var(--site-line))`,
                      }}
                    >
                      {p.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt="" style={{ width: "100%", aspectRatio: "21/9", objectFit: "cover", display: "block" }} />
                      )}
                      <div style={{ padding: "0 24px 24px" }}>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, marginTop: -27 }}>
                          <span
                            style={{
                              width: 58,
                              height: 58,
                              borderRadius: 15,
                              background: "#0e0c1d",
                              border: `1px solid color-mix(in srgb, ${accent} 40%, var(--site-line))`,
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                              boxShadow: "0 10px 26px rgba(5,4,16,0.65)",
                            }}
                          >
                            {logo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={logo} alt={`${p.name} logo`} style={{ width: 38, height: 38, objectFit: "contain", borderRadius: 8 }} />
                            ) : (
                              <span style={{ fontFamily: "var(--sw-font-display)", fontWeight: 800, color: accent }}>
                                {p.name.slice(0, 1)}
                              </span>
                            )}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--sw-font-display)",
                              fontWeight: 800,
                              fontSize: "1.3rem",
                              color: accent,
                              lineHeight: 1,
                              paddingBottom: 6,
                            }}
                          >
                            {p.name}
                          </span>
                        </div>
                        <div style={{ color: "var(--site-ink)", fontWeight: 550, marginTop: 14, lineHeight: 1.5 }}>
                          {p.tagline}
                        </div>
                        <div style={{ color: "var(--site-ink-soft)", fontSize: "0.9rem", marginTop: 8, lineHeight: 1.6 }}>
                          {p.description.length > 130 ? `${p.description.slice(0, 130).trimEnd()}…` : p.description}
                        </div>
                        {domain && (
                          <div
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 8,
                              marginTop: 18,
                              padding: "9px 16px",
                              borderRadius: 999,
                              border: `1.5px solid color-mix(in srgb, ${accent} 45%, transparent)`,
                              color: `color-mix(in srgb, ${accent} 85%, #fff)`,
                              fontSize: "0.88rem",
                              fontWeight: 600,
                            }}
                          >
                            {domain} ↗
                          </div>
                        )}
                      </div>
                    </a>
                  );
                })}
              </div>
              <div style={{ marginTop: 18 }}>
                <Link href="/products" style={{ color: "var(--site-ink-soft)", fontSize: "0.92rem", textDecoration: "none" }}>
                  See everything in the foundry →
                </Link>
              </div>
            </>
          )}

          {articles.length > 0 && (
            <>
              <h3 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, margin: "56px 0 18px", fontSize: "1.25rem" }}>
                Latest writing
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
                {articles.map((a) => (
                  <Link key={a.id} href={`/articles/${a.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
                    {a.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.coverImage} alt="" style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover" }} />
                    )}
                    <div style={{ padding: 20 }}>
                      <div style={{ fontSize: "0.78rem", color: "var(--site-ink-soft)" }}>
                        {formatDate(a.publishedAt)} · {a.readMinutes} min read
                      </div>
                      <div style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.05rem", marginTop: 8, lineHeight: 1.3 }}>
                        {a.title}
                      </div>
                      <div style={{ color: "var(--site-ink-soft)", fontSize: "0.9rem", marginTop: 8, lineHeight: 1.55 }}>
                        {a.excerpt}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop: 60, display: "flex", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-accent">Work with me</Link>
            <Link href="/articles" className="btn btn-ghost">All articles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
