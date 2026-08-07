"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer
      style={{
        position: "relative",
        zIndex: 30,
        borderTop: "1px solid var(--site-line)",
        background: "#100e24",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "42px clamp(18px,5vw,48px)",
          display: "flex",
          flexWrap: "wrap",
          gap: 24,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--sw-font-display)",
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            Karim Lazaar
          </div>
          <div style={{ color: "var(--site-ink-soft)", fontSize: "0.88rem" }}>
            Design engineer — Berlin, working worldwide.
          </div>
        </div>
        <nav
          aria-label="Footer"
          style={{ display: "flex", gap: 18, flexWrap: "wrap", fontSize: "0.9rem" }}
        >
          <Link href="/articles" style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}>
            Articles
          </Link>
          <Link href="/products" style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}>
            Products
          </Link>
          <Link href="/contact" style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}>
            Contact
          </Link>
          <a
            href="https://github.com/Karimaxapps"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}
          >
            GitHub
          </a>
          <a
            href="https://x.com/kareem_lazaar"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}
          >
            X
          </a>
          <a
            href="https://www.linkedin.com/in/karimlazaar"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--site-ink-soft)", textDecoration: "none" }}
          >
            LinkedIn
          </a>
          <Link href="/admin" style={{ color: "#4a4470", textDecoration: "none" }}>
            Admin
          </Link>
        </nav>
        <div style={{ color: "#4a4470", fontSize: "0.8rem", width: "100%" }}>
          © {new Date().getFullYear()} Karim Lazaar. Crafted as one continuous flight.
        </div>
      </div>
    </footer>
  );
}
