import Link from "next/link";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/slug";
import { logoutAction } from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  await requireAdmin();
  const [articles, products] = await Promise.all([
    prisma.article.findMany({ orderBy: { updatedAt: "desc" } }),
    prisma.product.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <main className="page-shell" style={{ paddingTop: 60 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="page-title" style={{ fontSize: "2rem", margin: "8px 0 0" }}>
            The publishing desk
          </h1>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/" className="btn btn-ghost" style={{ fontSize: "0.88rem", padding: "10px 18px" }}>
            View site
          </Link>
          <form action={logoutAction}>
            <button className="btn btn-ghost" style={{ fontSize: "0.88rem", padding: "10px 18px" }}>
              Sign out
            </button>
          </form>
        </div>
      </div>

      {/* Articles */}
      <section style={{ marginTop: 44 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.2rem", margin: 0 }}>
            Articles ({articles.length})
          </h2>
          <Link href="/admin/articles/new" className="btn btn-accent" style={{ fontSize: "0.88rem", padding: "10px 20px" }}>
            + New article
          </Link>
        </div>
        <div className="card" style={{ padding: 6 }}>
          {articles.length === 0 && (
            <p style={{ padding: 18, color: "var(--site-ink-soft)", margin: 0 }}>No articles yet.</p>
          )}
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/admin/articles/${a.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                textDecoration: "none",
                color: "inherit",
                borderRadius: 12,
              }}
            >
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {a.title}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--site-ink-soft)", marginTop: 3 }}>
                  /{a.slug} · updated {formatDate(a.updatedAt)}
                </div>
              </div>
              <span
                className="chip"
                style={
                  a.status === "PUBLISHED"
                    ? { background: "rgba(79,209,197,0.14)", borderColor: "rgba(79,209,197,0.4)", color: "#7fe0d6" }
                    : { background: "rgba(240,168,96,0.12)", borderColor: "rgba(240,168,96,0.4)", color: "#f0c090" }
                }
              >
                {a.status === "PUBLISHED" ? "Published" : "Draft"}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ marginTop: 44 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.2rem", margin: 0 }}>
            Products ({products.length})
          </h2>
          <Link href="/admin/products/new" className="btn btn-accent" style={{ fontSize: "0.88rem", padding: "10px 20px" }}>
            + New product
          </Link>
        </div>
        <div className="card" style={{ padding: 6 }}>
          {products.length === 0 && (
            <p style={{ padding: 18, color: "var(--site-ink-soft)", margin: 0 }}>No products yet.</p>
          )}
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/admin/products/${p.id}`}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 14,
                padding: "14px 18px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, color: p.accent ?? "inherit" }}>{p.name}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--site-ink-soft)", marginTop: 3 }}>
                  {p.tagline}
                </div>
              </div>
              {p.featured && <span className="chip">Featured</span>}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
