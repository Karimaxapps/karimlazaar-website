import Link from "next/link";
import ScrollWorld from "@/components/ScrollWorld";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/slug";

export const dynamic = "force-dynamic";

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

          {products.length > 0 && (
            <>
              <h3 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, margin: "56px 0 18px", fontSize: "1.25rem" }}>
                Flagship products
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 18 }}>
                {products.map((p) => (
                  <Link key={p.id} href="/products" className="card" style={{ textDecoration: "none", color: "inherit", padding: 22 }}>
                    <div style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.08rem", color: p.accent ?? "var(--site-violet)" }}>
                      {p.name}
                    </div>
                    <div style={{ color: "var(--site-ink-soft)", fontSize: "0.92rem", marginTop: 8, lineHeight: 1.55 }}>
                      {p.tagline}
                    </div>
                  </Link>
                ))}
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
