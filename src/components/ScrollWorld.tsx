"use client";

import { useEffect, useRef } from "react";
import { WORLD_CONFIG } from "@/lib/world";

export default function ScrollWorld() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let engine: { destroy: () => void } | null = null;
    let cancelled = false;

    import("@/lib/scrub-engine.js").then((m) => {
      if (cancelled || !ref.current) return;
      engine = m.mountScrollWorld(ref.current, WORLD_CONFIG);
    });

    return () => {
      cancelled = true;
      engine?.destroy();
    };
  }, []);

  return <div ref={ref} aria-label="A scroll-driven flight through Karim Lazaar's world" />;
}
