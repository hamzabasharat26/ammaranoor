import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Hide the floating "N" dev overlay button. It only ever renders under
  // `next dev` — never in `next start` / production — but it should not be on
  // screen while judging the design locally either.
  devIndicators: false,
  images: {
    // The only SVG ever passed to next/image is our own built mockup poster
    // (public/media/recruiter/ranking.svg) — static, authored here, no user
    // input. CSP below still blocks scripts inside any SVG that slips through.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Every file under public/media/ is a build-time asset with a stable path —
  // nothing there is ever replaced in place — so it can be cached hard at the
  // edge/browser. Cuts the "media is slow on a fresh deploy" case: a repeat
  // visit (or a second page on the same visit) never re-fetches a clip or a
  // poster it already has.
  async headers() {
    return [
      // Baseline hardening on every route.
      //
      // The CSP is strict because this site genuinely has no third parties:
      // next/font self-hosts its files, there is no analytics, no embed and no
      // external image host. 'unsafe-inline' is needed in two places and only
      // two: the pre-paint theme script in layout.tsx (which must run before
      // first paint, so it cannot be deferred to a file) and React's inline
      // style attributes. Adding any third-party script means revisiting this,
      // not widening it by reflex.
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // 'unsafe-eval' is DEV ONLY. React's development build uses eval()
              // for debugging features (reconstructing callstacks across
              // environments); blocking it does nothing to the app but does make
              // the dev overlay report a permanent "1 Issue". React never uses
              // eval() in production, so the shipped policy stays strict.
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
                : "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob:",
              "media-src 'self'",
              "font-src 'self'",
              "connect-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
      // Every media asset — images, video, the agent avatar, sound, the CV —
      // lives under this one folder now, so one rule covers all of it.
      {
        source: "/media/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // The CV keeps a stable filename so links never break — which means it
      // must NOT be cached as immutable, or visitors keep an outdated CV for a
      // year. Declared after the /media rule so it wins.
      {
        source: "/media/Ammara_Noor_CV.pdf",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
