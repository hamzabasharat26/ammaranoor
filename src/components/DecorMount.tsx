"use client";

import dynamic from "next/dynamic";

/**
 * Decorative layers that must not sit on the critical path.
 *
 * The custom cursor is pure decoration over the native one and is suppressed
 * entirely on touch and under reduced motion, so paying for it during first
 * load buys nothing. `ssr: false` is only legal inside a client component,
 * which is why this wrapper exists at all — page.tsx is a Server Component.
 */
const Cursor = dynamic(() => import("./Cursor"), { ssr: false });

export default function DecorMount() {
  return <Cursor />;
}
