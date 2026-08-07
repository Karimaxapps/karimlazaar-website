"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "World" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/articles", label: "Interests" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <Link href="/" className="site-brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/media/karim-logo.webp" alt="" className="site-brand__mark" />
        <span>Karim Lazaar</span>
      </Link>
      <nav className="site-nav" aria-label="Site">
        {LINKS.map((l) => {
          const active =
            l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
          return (
            <Link key={l.href} href={l.href} className={active ? "active" : ""}>
              {l.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
