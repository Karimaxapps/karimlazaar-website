import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Flagship products built end to end by Karim Lazaar — from broadcast-industry platforms to football lineup tools and contactless ordering.",
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <main className="page-shell">
      <span className="eyebrow">The Foundry</span>
      <h1 className="page-title">Products, built end to end.</h1>
      <p className="page-lead">
        Each of these started as a sketch and became a production system — designed,
        engineered, and shipped by one pair of hands.
      </p>

      {products.length === 0 ? (
        <p style={{ marginTop: 48, color: "var(--site-ink-soft)" }}>
          The foundry is warming up — products are being added.
        </p>
      ) : (
        <div style={{ marginTop: 48, display: "grid", gap: 24 }}>
          {products.map((p, i) => (
            <div
              key={p.id}
              className="card"
              style={{
                display: "grid",
                gridTemplateColumns: p.image ? "minmax(0,5fr) minmax(0,7fr)" : "1fr",
                alignItems: "stretch",
              }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.image}
                  alt={`${p.name} visual`}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: 220,
                    objectFit: "cover",
                    display: "block",
                    order: i % 2 === 0 ? 0 : 1,
                  }}
                />
              )}
              <div style={{ padding: "clamp(22px,3.4vw,38px)", display: "flex", flexDirection: "column", gap: 12, justifyContent: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--sw-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(1.3rem,2.4vw,1.7rem)",
                    color: p.accent ?? "var(--site-violet)",
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontWeight: 600, color: "var(--site-ink)" }}>{p.tagline}</div>
                <p style={{ color: "var(--site-ink-soft)", lineHeight: 1.65, margin: 0 }}>
                  {p.description}
                </p>
                {p.link && (
                  <div style={{ marginTop: 8 }}>
                    <a href={p.link} target="_blank" rel="noreferrer" className="btn btn-ghost" style={{ fontSize: "0.88rem", padding: "10px 20px" }}>
                      Visit project ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
