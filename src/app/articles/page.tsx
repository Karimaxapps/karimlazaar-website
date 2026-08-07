import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/slug";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Essays by Karim Lazaar on cinematic UX, design engineering, broadcast-grade reliability, and building products solo.",
};

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <main className="page-shell">
      <span className="eyebrow">The Library</span>
      <h1 className="page-title">Notes from the workshop.</h1>
      <p className="page-lead">
        Essays on cinematic UX, design engineering, and what live broadcast taught me
        about building software that cannot fail.
      </p>

      {articles.length === 0 ? (
        <p style={{ marginTop: 48, color: "var(--site-ink-soft)" }}>
          Nothing published yet — the first essays are being written.
        </p>
      ) : (
        <div
          style={{
            marginTop: 48,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))",
            gap: 22,
          }}
        >
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/articles/${a.slug}`}
              className="card"
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              {a.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={a.coverImage}
                  alt=""
                  style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }}
                />
              )}
              <div style={{ padding: 22 }}>
                <div style={{ fontSize: "0.78rem", color: "var(--site-ink-soft)" }}>
                  {formatDate(a.publishedAt)} · {a.readMinutes} min read
                </div>
                <h2
                  style={{
                    fontFamily: "var(--sw-font-display)",
                    fontWeight: 700,
                    fontSize: "1.18rem",
                    lineHeight: 1.3,
                    margin: "10px 0 0",
                  }}
                >
                  {a.title}
                </h2>
                <p
                  style={{
                    color: "var(--site-ink-soft)",
                    fontSize: "0.92rem",
                    lineHeight: 1.6,
                    margin: "10px 0 0",
                  }}
                >
                  {a.excerpt}
                </p>
                {a.tags && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
                    {a.tags.split(",").map((t) => (
                      <span key={t} className="chip">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
