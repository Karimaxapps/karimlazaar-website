import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { marked } from "marked";
import { prisma } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import { formatDate } from "@/lib/slug";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: article.coverImage
      ? { images: [article.coverImage], title: article.title, description: article.excerpt }
      : undefined,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await prisma.article.findUnique({ where: { slug } });
  if (!article) notFound();
  if (article.status !== "PUBLISHED" && !(await isAdmin())) notFound();

  const html = await marked.parse(article.content);

  return (
    <main className="page-shell" style={{ maxWidth: 820 }}>
      <Link
        href="/articles"
        style={{ color: "var(--site-ink-soft)", textDecoration: "none", fontSize: "0.9rem" }}
      >
        ← All articles
      </Link>

      <header style={{ margin: "26px 0 34px" }}>
        {article.status !== "PUBLISHED" && (
          <span
            className="chip"
            style={{ background: "#4a3a10", borderColor: "#8a6d1d", color: "#f0c860", marginBottom: 14 }}
          >
            Draft preview
          </span>
        )}
        <div style={{ fontSize: "0.85rem", color: "var(--site-ink-soft)" }}>
          {formatDate(article.publishedAt ?? article.createdAt)} · {article.readMinutes} min read
        </div>
        <h1 className="page-title" style={{ margin: "12px 0 0" }}>
          {article.title}
        </h1>
        {article.tags && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
            {article.tags.split(",").map((t) => (
              <span key={t} className="chip">
                {t.trim()}
              </span>
            ))}
          </div>
        )}
      </header>

      {article.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.coverImage}
          alt=""
          style={{
            width: "100%",
            aspectRatio: "21/9",
            objectFit: "cover",
            borderRadius: 18,
            border: "1px solid var(--site-line)",
            marginBottom: 36,
          }}
        />
      )}

      <article className="prose-dark" dangerouslySetInnerHTML={{ __html: html }} />

      <footer
        style={{
          marginTop: 64,
          paddingTop: 28,
          borderTop: "1px solid var(--site-line)",
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <Link href="/articles" className="btn btn-ghost">
          More articles
        </Link>
        <Link href="/contact" className="btn btn-accent">
          Work with me
        </Link>
      </footer>
    </main>
  );
}
