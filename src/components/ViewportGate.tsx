"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Renders `children` only above a width. `hidden md:block` is not the same
 * thing: a display:none image is still fetched, and on throttled mobile the
 * project ticker's eighteen posters were saturating the connection and pushing
 * Largest Contentful Paint out by seconds for content nobody could see.
 *
 * Children are server-rendered and passed through, so this costs no extra
 * client code beyond the media query itself.
 */
export default function ViewportGate({
  min = 768,
  children,
}: {
  min?: number;
  children: ReactNode;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${min}px)`);
    const sync = () => setShow(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [min]);

  return show ? <>{children}</> : null;
}
