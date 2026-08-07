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
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 22 }}>
          {products.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ display: "flex", flexDirection: "column" }}
            >
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                // Native 3:2, flush with the card edges — artwork fully visible, never cropped.
                <img
                  src={p.image}
                  alt={`${p.name} visual`}
                  style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }}
                />
              )}
              <div style={{ padding: "clamp(20px,2.6vw,28px)", display: "flex", flexDirection: "column", gap: 12, flexGrow: 1 }}>
                <div
                  style={{
                    fontFamily: "var(--sw-font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(1.2rem,1.8vw,1.45rem)",
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
                  <div style={{ marginTop: "auto", paddingTop: 14 }}>
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
