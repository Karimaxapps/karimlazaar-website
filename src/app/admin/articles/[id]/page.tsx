import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveArticle, deleteArticle } from "../../actions";
import DangerButton from "@/components/DangerButton";
import { INTERESTS } from "@/lib/interests";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit article" };

export default async function ArticleEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const article = isNew
    ? null
    : await prisma.article.findUnique({ where: { id: Number(id) || 0 } });
  if (!isNew && !article) notFound();

  return (
    <main className="page-shell" style={{ paddingTop: 60, maxWidth: 900 }}>
      <Link href="/admin" style={{ color: "var(--site-ink-soft)", textDecoration: "none", fontSize: "0.9rem" }}>
        ← Dashboard
      </Link>
      <h1 className="page-title" style={{ fontSize: "1.8rem", margin: "16px 0 30px" }}>
        {isNew ? "New article" : `Editing: ${article!.title}`}
      </h1>

      <form action={saveArticle} style={{ display: "grid", gap: 22 }}>
        <input type="hidden" name="id" value={article?.id ?? 0} />

        <div>
          <label className="label" htmlFor="title">Title</label>
          <input id="title" name="title" required className="field" defaultValue={article?.title ?? ""} placeholder="The headline of the piece" />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <label className="label" htmlFor="slug">Slug (blank = from title)</label>
            <input id="slug" name="slug" className="field" defaultValue={article?.slug ?? ""} placeholder="my-article-slug" />
          </div>
          <div>
            <label className="label" htmlFor="tags">Tags (comma separated)</label>
            <input id="tags" name="tags" className="field" defaultValue={article?.tags ?? ""} placeholder="Cinematic UX, Broadcast" />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="interest">Interest cluster (Curiosity Space)</label>
          <select id="interest" name="interest" className="field" defaultValue={article?.interest ?? ""}>
            <option value="">— none —</option>
            {INTERESTS.map((i) => (
              <option key={i.slug} value={i.slug}>{i.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="label" htmlFor="coverImage">Cover image URL (e.g. /media/cover.webp)</label>
          <input id="coverImage" name="coverImage" className="field" defaultValue={article?.coverImage ?? ""} placeholder="/media/my-cover.webp" />
        </div>

        <div>
          <label className="label" htmlFor="excerpt">Excerpt (shown on cards)</label>
          <textarea id="excerpt" name="excerpt" required rows={2} className="field" defaultValue={article?.excerpt ?? ""} placeholder="One or two sentences that sell the piece." />
        </div>

        <div>
          <label className="label" htmlFor="content">Content (Markdown)</label>
          <textarea id="content" name="content" required rows={22} className="field" defaultValue={article?.content ?? ""} placeholder="## Write in markdown&#10;&#10;Your story starts here…" />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.95rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            name="publish"
            defaultChecked={article?.status === "PUBLISHED"}
            style={{ width: 18, height: 18, accentColor: "var(--site-violet)" }}
          />
          Published (visible on the site)
        </label>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <button type="submit" className="btn btn-accent">Save article</button>
          {article && (
            <Link href={`/articles/${article.slug}`} className="btn btn-ghost" style={{ fontSize: "0.9rem" }}>
              Preview →
            </Link>
          )}
        </div>
      </form>

      {article && (
        <form action={deleteArticle} style={{ marginTop: 34, paddingTop: 22, borderTop: "1px solid var(--site-line)" }}>
          <input type="hidden" name="id" value={article.id} />
          <DangerButton confirmText={`Delete "${article.title}" permanently?`}>
            Delete article
          </DangerButton>
        </form>
      )}
    </main>
  );
}
