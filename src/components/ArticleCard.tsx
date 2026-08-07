import Link from "next/link";
import { formatDate } from "@/lib/slug";

type ArticleLike = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string | null;
  tags: string | null;
  publishedAt: Date | null;
  readMinutes: number;
};

export default function ArticleCard({
  article,
  accent,
}: {
  article: ArticleLike;
  accent?: string;
}) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="card"
      style={{
        textDecoration: "none",
        color: "inherit",
        display: "block",
        ...(accent
          ? ({ "--card-accent": accent } as React.CSSProperties)
          : {}),
      }}
    >
      {article.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverImage}
          alt=""
          style={{ width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block" }}
        />
      )}
      <div style={{ padding: 22 }}>
        <div style={{ fontSize: "0.78rem", color: "var(--site-ink-soft)" }}>
          {formatDate(article.publishedAt)} · {article.readMinutes} min read
        </div>
        <h3
          style={{
            fontFamily: "var(--sw-font-display)",
            fontWeight: 700,
            fontSize: "1.14rem",
            lineHeight: 1.3,
            margin: "10px 0 0",
          }}
        >
          {article.title}
        </h3>
        <p
          style={{
            color: "var(--site-ink-soft)",
            fontSize: "0.92rem",
            lineHeight: 1.6,
            margin: "10px 0 0",
          }}
        >
          {article.excerpt}
        </p>
        {article.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 14 }}>
            {article.tags.split(",").slice(0, 3).map((t) => (
              <span
                key={t}
                className="chip"
                style={
                  accent
                    ? {
                        color: `color-mix(in srgb, ${accent} 80%, #fff)`,
                        background: `color-mix(in srgb, ${accent} 14%, transparent)`,
                        borderColor: `color-mix(in srgb, ${accent} 32%, transparent)`,
                      }
                    : undefined
                }
              >
                {t.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
