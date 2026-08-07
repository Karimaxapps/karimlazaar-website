import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { INTERESTS } from "@/lib/interests";
import ArticleCard from "@/components/ArticleCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Articles & Interests",
  description:
    "Karim Lazaar's curiosity space — a universe of interests: AI architectures, quantum physics, astronomy, robotics, brain elasticity, neuroeconomics, and the craft of building products.",
};

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });

  const byInterest = new Map<string, typeof articles>();
  for (const a of articles) {
    const slug = INTERESTS.some((i) => i.slug === a.interest) ? a.interest! : "craft";
    byInterest.set(slug, [...(byInterest.get(slug) ?? []), a]);
  }

  return (
    <main className="page-shell" style={{ maxWidth: 1160 }}>
      <span className="eyebrow">Articles &amp; Interests</span>
      <h1 className="page-title">My curiosity space.</h1>
      <p className="page-lead">
        This is not just a blog — it&apos;s a map of everything that pulls my attention.
        Seven worlds I keep orbiting: some I build in, some I only wonder at. Pick a
        planet and drop into its transmissions.
      </p>

      {/* Universe map */}
      <nav className="universe" aria-label="Interest universe">
        {INTERESTS.map((i) => {
          const count = byInterest.get(i.slug)?.length ?? 0;
          return (
            <a
              key={i.slug}
              href={`#${i.slug}`}
              className="planet"
              style={
                {
                  left: `${i.x}%`,
                  top: `${i.y}%`,
                  width: i.size,
                  "--pc": i.color,
                  "--drift": `${i.drift}s`,
                } as React.CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.planet} alt="" />
              <span className="p-name" style={{ color: i.color }}>
                {i.name}
              </span>
              <span className="p-count">
                {count} transmission{count === 1 ? "" : "s"}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Clusters */}
      {INTERESTS.map((i) => {
        const list = byInterest.get(i.slug) ?? [];
        return (
          <section
            key={i.slug}
            id={i.slug}
            className="cluster"
            style={{ "--pc": i.color } as React.CSSProperties}
          >
            <div className="cluster-head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={i.planet} alt="" />
              <div>
                <h2>{i.name}</h2>
                <p>{i.blurb}</p>
              </div>
            </div>
            {list.length === 0 ? (
              <p style={{ color: "var(--site-ink-soft)", fontStyle: "italic" }}>
                No transmissions yet — signals incoming.
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
                  gap: 20,
                }}
              >
                {list.map((a) => (
                  <ArticleCard key={a.id} article={a} accent={i.color} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
