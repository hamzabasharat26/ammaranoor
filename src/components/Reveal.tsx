"use client";

import { useRef, type ReactNode } from "react";
import { useReveal } from "@/lib/reveal";

/**
 * Wraps a section so its contents can reveal on scroll while the section
 * itself stays a Server Component.
 *
 * Five sections on this page need no interactivity at all — they only needed
 * to be client components because the reveal hook had to run somewhere. That
 * cost their entire markup in hydration, which was 800ms of blocking time on
 * throttled mobile. This is the only client code they need now.
 *
 * `display: contents` so the wrapper hosts the ref without joining the layout.
 */
export default function Reveal({
  selector,
  children,
}: {
  selector: string;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, { selector });
  return (
    <div ref={root} style={{ display: "contents" }}>
      {children}
    </div>
  );
}
