import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { saveProduct, deleteProduct } from "../../actions";
import DangerButton from "@/components/DangerButton";

export const dynamic = "force-dynamic";
export const metadata = { title: "Edit product" };

export default async function ProductEditor({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const isNew = id === "new";
  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id: Number(id) || 0 } });
  if (!isNew && !product) notFound();

  return (
    <main className="page-shell" style={{ paddingTop: 60, maxWidth: 820 }}>
      <Link href="/admin" style={{ color: "var(--site-ink-soft)", textDecoration: "none", fontSize: "0.9rem" }}>
        ← Dashboard
      </Link>
      <h1 className="page-title" style={{ fontSize: "1.8rem", margin: "16px 0 30px" }}>
        {isNew ? "New product" : `Editing: ${product!.name}`}
      </h1>

      <form action={saveProduct} style={{ display: "grid", gap: 22 }}>
        <input type="hidden" name="id" value={product?.id ?? 0} />

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
          <div>
            <label className="label" htmlFor="name">Name</label>
            <input id="name" name="name" required className="field" defaultValue={product?.name ?? ""} />
          </div>
          <div>
            <label className="label" htmlFor="accent">Accent color (hex)</label>
            <input id="accent" name="accent" className="field" defaultValue={product?.accent ?? ""} placeholder="#8B7CF6" />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="tagline">Tagline</label>
          <input id="tagline" name="tagline" required className="field" defaultValue={product?.tagline ?? ""} placeholder="One line that says what it is" />
        </div>

        <div>
          <label className="label" htmlFor="description">Description</label>
          <textarea id="description" name="description" required rows={5} className="field" defaultValue={product?.description ?? ""} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          <div>
            <label className="label" htmlFor="image">Image URL</label>
            <input id="image" name="image" className="field" defaultValue={product?.image ?? ""} placeholder="/media/product.webp" />
          </div>
          <div>
            <label className="label" htmlFor="link">External link</label>
            <input id="link" name="link" className="field" defaultValue={product?.link ?? ""} placeholder="https://…" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.95rem", cursor: "pointer" }}>
            <input type="checkbox" name="featured" defaultChecked={product?.featured ?? true} style={{ width: 18, height: 18, accentColor: "var(--site-violet)" }} />
            Featured on home
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "0.95rem" }}>
            Sort order
            <input type="number" name="sortOrder" className="field" style={{ width: 90 }} defaultValue={product?.sortOrder ?? 0} />
          </label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button type="submit" className="btn btn-accent">Save product</button>
        </div>
      </form>

      {product && (
        <form action={deleteProduct} style={{ marginTop: 34, paddingTop: 22, borderTop: "1px solid var(--site-line)" }}>
          <input type="hidden" name="id" value={product.id} />
          <DangerButton confirmText={`Delete "${product.name}" permanently?`}>
            Delete product
          </DangerButton>
        </form>
      )}
    </main>
  );
}
