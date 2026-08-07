// The Curiosity Space — Karim's interest universe. Each interest is a "planet"
// on /articles; articles reference an interest by slug (Article.interest).

export type Interest = {
  slug: string;
  name: string;
  short: string;
  color: string;
  planet: string;
  blurb: string;
  // universe-map layout (desktop): percentage position + size in px
  x: number;
  y: number;
  size: number;
  drift: number; // float animation duration (s)
};

export const INTERESTS: Interest[] = [
  {
    slug: "ai",
    name: "AI & Future Architectures",
    short: "AI",
    color: "#8B7CF6",
    planet: "/media/planet-ai.webp",
    blurb:
      "Where models go after the transformer — new architectures, reasoning machines, and what builders should bet on.",
    x: 8, y: 12, size: 150, drift: 13,
  },
  {
    slug: "quantum",
    name: "Quantum Physics & Programming",
    short: "Quantum",
    color: "#4FD1C5",
    planet: "/media/planet-quantum.webp",
    blurb:
      "Superposition, entanglement, and what happens to a programmer's brain when bits stop being just 0 or 1.",
    x: 34, y: 46, size: 122, drift: 17,
  },
  {
    slug: "astronomy",
    name: "Astronomy",
    short: "Astronomy",
    color: "#86AFF5",
    planet: "/media/planet-astronomy.webp",
    blurb:
      "The ultimate perspective machine — night skies, space telescopes, and deadlines shrinking next to ancient light.",
    x: 62, y: 8, size: 138, drift: 15,
  },
  {
    slug: "robotics",
    name: "Robotics",
    short: "Robotics",
    color: "#F0A860",
    planet: "/media/planet-robotics.webp",
    blurb:
      "Machines learning like juniors — the moment robotics moved from motors to minds.",
    x: 85, y: 38, size: 118, drift: 12,
  },
  {
    slug: "brain",
    name: "Brain Elasticity",
    short: "Brain",
    color: "#E38FB8",
    planet: "/media/planet-brain.webp",
    blurb:
      "Neuroplasticity as an engineering discipline — how learning physically rewires us, at any age.",
    x: 14, y: 62, size: 126, drift: 16,
  },
  {
    slug: "neuroeconomics",
    name: "Neuroeconomics",
    short: "Neuroecon",
    color: "#6FBF73",
    planet: "/media/planet-neuroeconomics.webp",
    blurb:
      "How brains actually compute value and choose — dopamine, framing, and the ethics of designing around it.",
    x: 56, y: 58, size: 112, drift: 14,
  },
  {
    slug: "craft",
    name: "Design Engineering & Craft",
    short: "Craft",
    color: "#F2E7D8",
    planet: "/media/planet-craft.webp",
    blurb:
      "The home planet — building products end to end, cinematic UX, and lessons from live broadcast.",
    x: 38, y: 4, size: 104, drift: 18,
  },
];

export function getInterest(slug: string | null | undefined): Interest | undefined {
  return INTERESTS.find((i) => i.slug === slug);
}
