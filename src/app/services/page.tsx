import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Work with Karim Lazaar — AI expertise and solutions, web & app development, and personalized systems built around how your business actually works.",
};

const SERVICES = [
  {
    name: "AI Expertise & Solutions",
    accent: "#8B7CF6",
    image: "/media/service-ai.webp",
    pitch:
      "Empowering businesses with the latest, most powerful AI tools — applied where they actually pay off, not where the hype points.",
    bullets: [
      "AI opportunity audit: where models genuinely help your workflows",
      "LLM, agent and automation integration into your existing systems",
      "Generative content pipelines — images, video, copy — with quality control",
      "Team enablement: your people learn to drive the tools themselves",
    ],
  },
  {
    name: "Web & App Development",
    accent: "#4FD1C5",
    image: "/media/service-webdev.webp",
    pitch:
      "End-to-end product development from one pair of hands — design, engineering, deployment, and the polish in between.",
    bullets: [
      "Web platforms and SaaS built on Next.js and TypeScript",
      "Dashboards and admin systems with broadcast-grade reliability",
      "Cinematic marketing sites that move like film, not like templates",
      "Deployment, monitoring and the boring parts done properly",
    ],
  },
  {
    name: "Personalized Business Solutions",
    accent: "#F0A860",
    image: "/media/service-custom.webp",
    pitch:
      "Bespoke systems tailored to how your business actually works — like a well-fitted suit, not off the rack.",
    bullets: [
      "Workflow mapping: understand the real process before building",
      "Custom platforms — ordering, booking, directories, internal tools",
      "Integrations that make your existing tools finally talk to each other",
      "Long-term partnership: I stay after launch",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="page-shell">
      <span className="eyebrow">Services</span>
      <h1 className="page-title">What I can build for you.</h1>
      <p className="page-lead">
        I work with a small number of clients at a time, end to end — from the first
        sketch to the running system. Three ways we can work together:
      </p>

      <div style={{ marginTop: 48, display: "grid", gap: 24 }}>
        {SERVICES.map((s, idx) => (
          <div
            key={s.name}
            className="card service-card"
            style={{ "--pc": s.accent } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={s.image}
              alt={`${s.name} illustration`}
              style={{
                width: "100%",
                height: "100%",
                minHeight: 230,
                objectFit: "cover",
                display: "block",
                order: idx % 2 === 0 ? 0 : 1,
              }}
            />
            <div
              style={{
                padding: "clamp(24px,3.6vw,40px)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--sw-font-display)",
                  fontWeight: 800,
                  fontSize: "clamp(1.3rem,2.4vw,1.65rem)",
                  color: s.accent,
                }}
              >
                {s.name}
              </div>
              <p style={{ color: "var(--site-ink)", fontWeight: 550, margin: 0, lineHeight: 1.55 }}>
                {s.pitch}
              </p>
              <ul className="service-bullets">
                {s.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2
        style={{
          fontFamily: "var(--sw-font-display)",
          fontWeight: 700,
          fontSize: "1.3rem",
          margin: "64px 0 6px",
        }}
      >
        How we&apos;ll work
      </h2>
      <div className="process-strip">
        <div className="process-step">
          <b>01 — Discover</b>
          <span>We map what your business actually needs — not what a template offers.</span>
        </div>
        <div className="process-step">
          <b>02 — Design</b>
          <span>Prototypes you can touch early, refined until the flow feels obvious.</span>
        </div>
        <div className="process-step">
          <b>03 — Build</b>
          <span>Reliable engineering with cinematic polish, shipped in visible increments.</span>
        </div>
        <div className="process-step">
          <b>04 — Run</b>
          <span>Deployment, monitoring, and a partner who stays after launch day.</span>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginTop: 40,
          padding: "clamp(26px,4vw,40px)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          borderColor: "color-mix(in srgb, var(--site-violet) 40%, var(--site-line))",
        }}
      >
        <div>
          <div style={{ fontFamily: "var(--sw-font-display)", fontWeight: 700, fontSize: "1.25rem" }}>
            Have something in mind?
          </div>
          <div style={{ color: "var(--site-ink-soft)", marginTop: 6 }}>
            Tell me what you&apos;re dreaming about — I reply within a day.
          </div>
        </div>
        <Link href="/contact" className="btn btn-accent">
          Start a conversation
        </Link>
      </div>
    </main>
  );
}
