"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {
  isValidPassword,
  requireAdmin,
  sessionToken,
  SESSION_COOKIE,
} from "@/lib/auth";
import { slugify, readMinutes } from "@/lib/slug";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  if (!isValidPassword(password)) redirect("/admin/login?error=1");
  const store = await cookies();
  store.set(SESSION_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/admin");
}

export async function logoutAction() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

async function uniqueSlug(base: string, ignoreId?: number): Promise<string> {
  let slug = base;
  for (let i = 2; i < 50; i++) {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (!existing || existing.id === ignoreId) return slug;
    slug = `${base}-${i}`;
  }
  return `${base}-${Date.now()}`;
}

export async function saveArticle(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") ?? 0);
  const title = String(formData.get("title") ?? "").trim();
  if (!title) redirect(id ? `/admin/articles/${id}?error=title` : "/admin/articles/new?error=title");

  const rawSlug = String(formData.get("slug") ?? "").trim();
  const content = String(formData.get("content") ?? "");
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const tags = String(formData.get("tags") ?? "").trim() || null;
  const publish = formData.get("publish") === "on";

  const slug = await uniqueSlug(slugify(rawSlug || title), id || undefined);
  const existing = id ? await prisma.article.findUnique({ where: { id } }) : null;

  const data = {
    title,
    slug,
    content,
    excerpt,
    coverImage,
    tags,
    readMinutes: readMinutes(content),
    status: publish ? ("PUBLISHED" as const) : ("DRAFT" as const),
    publishedAt: publish ? existing?.publishedAt ?? new Date() : null,
  };

  if (existing) {
    await prisma.article.update({ where: { id }, data });
  } else {
    await prisma.article.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  redirect("/admin?saved=1");
}

export async function deleteArticle(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") ?? 0);
  if (id) await prisma.article.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/articles");
  redirect("/admin?deleted=1");
}

export async function saveProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") ?? 0);
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect(id ? `/admin/products/${id}?error=name` : "/admin/products/new?error=name");

  const data = {
    name,
    slug: slugify(String(formData.get("slug") ?? "").trim() || name),
    tagline: String(formData.get("tagline") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim() || null,
    link: String(formData.get("link") ?? "").trim() || null,
    accent: String(formData.get("accent") ?? "").trim() || null,
    featured: formData.get("featured") === "on",
    sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
  };

  if (id) {
    await prisma.product.update({ where: { id }, data });
  } else {
    await prisma.product.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin?saved=1");
}

export async function deleteProduct(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get("id") ?? 0);
  if (id) await prisma.product.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin?deleted=1");
}
