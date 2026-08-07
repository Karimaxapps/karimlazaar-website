import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Work with Karim Lazaar — freelance product design and engineering.",
};

const CHANNELS = [
  {
    label: "Email",
    value: "contact@karimlazaar.com",
    href: "mailto:contact@karimlazaar.com",
    note: "Best for project inquiries — I reply within a day.",
  },
  {
    label: "LinkedIn",
    value: "in/karimlazaar",
    href: "https://www.linkedin.com/in/karimlazaar",
    note: "For professional context and recommendations.",
  },
  {
    label: "X / Twitter",
    value: "@kareem_lazaar",
    href: "https://x.com/kareem_lazaar",
    note: "Build logs, experiments, and shorter thoughts.",
  },
  {
    label: "GitHub",
    value: "Karimaxapps",
    href: "https://github.com/Karimaxapps",
    note: "Selected open work and prototypes.",
  },
];

export default function ContactPage() {
  return (
    <main className="page-shell" style={{ maxWidth: 860 }}>
      <span className="eyebrow">The Observatory</span>
      <h1 className="page-title">Let&apos;s build something together.</h1>
      <p className="page-lead">
        I&apos;m currently accepting freelance work and consulting projects — product
        design, design engineering, and cinematic interfaces that stay reliable under
        pressure. Based in Berlin, working worldwide.
      </p>

      <div style={{ marginTop: 46, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="card"
            style={{ textDecoration: "none", color: "inherit", padding: 24, display: "block" }}
          >
            <div className="eyebrow" style={{ fontSize: "0.72rem" }}>{c.label}</div>
            <div
              style={{
                fontFamily: "var(--sw-font-display)",
                fontWeight: 700,
                fontSize: "1.12rem",
                margin: "10px 0 8px",
              }}
            >
              {c.value}
            </div>
            <div style={{ color: "var(--site-ink-soft)", fontSize: "0.9rem", lineHeight: 1.55 }}>
              {c.note}
            </div>
          </a>
        ))}
      </div>

      <div
        className="card"
        style={{ marginTop: 26, padding: "26px 28px", borderColor: "color-mix(in srgb, var(--site-violet) 40%, var(--site-line))" }}
      >
        <div style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, marginBottom: 8 }}>
          What I can help with
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            "Product design",
            "Design systems",
            "Next.js engineering",
            "3D & motion for product",
            "Broadcast & media tools",
            "SaaS dashboards",
            "MVP from zero",
          ].map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </div>
    </main>
  );
}
