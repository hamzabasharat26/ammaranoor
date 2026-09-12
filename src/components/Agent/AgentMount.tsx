"use client";

import dynamic from "next/dynamic";

/**
 * Keeps the assistant out of the first load.
 *
 * The launcher pulls in the panel, the topic matcher and src/lib/audio.ts —
 * ~30 KB gz that nobody needs to render the page, and the home route's budget
 * is 250 KB gz (CLAUDE.md §4). `ssr: false` is only legal inside a client
 * component, which is the entire reason this wrapper exists; page.tsx is a
 * Server Component.
 *
 * No loading placeholder on purpose: a floating button that pops in late is
 * better than a skeleton of a floating button.
 */
const AgentLauncher = dynamic(() => import("./AgentLauncher"), { ssr: false });

export default function AgentMount() {
  return <AgentLauncher />;
}
