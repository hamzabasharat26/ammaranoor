import type { Metadata } from "next";
import { cv } from "@/content/cv";

/**
 * The ATS-parseable one-page CV. This route is the SOURCE of
 * public/media/Ammara_Noor_CV.pdf — scripts/build-cv.mjs prints it to A4.
 *
 * Deliberately plain: one column, no tables, no images, no icons, black on
 * white, standard headings, real selectable text. Everything an applicant
 * tracking system chokes on is absent by construction. Do not add the site
 * chrome here — /cv is the designed version for humans, this is the machine
 * one.
 *
 * noindex: this exists to be printed, not crawled. The designed /cv carries
 * the same content for search.
 */
export const metadata: Metadata = {
  title: "CV (print)",
  robots: { index: false, follow: false },
};

const CSS = `
  .ats { --ink:#000; --rule:#000; }
  .ats {
    background:#fff; color:var(--ink);
    font-family: Calibri, Carlito, "Segoe UI", Arial, Helvetica, sans-serif;
    font-size: 8.9pt; line-height: 1.19;
    /* Ligatures OFF: the fi/fl ligature glyphs extract as U+FB01/U+FB02, which
       turns "MLflow" into "ML<fl>ow" for a keyword matcher. */
    font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0;
    max-width: 190mm; margin: 0 auto; padding: 7mm 11mm 4mm;
  }
  .ats h1 { font-size: 18pt; font-weight: 700; letter-spacing: .2px; margin: 0; }
  .ats .role { font-size: 9.8pt; font-weight: 600; margin: 1.5pt 0 0; }
  .ats .meta { font-size: 8.5pt; margin: 2.5pt 0 0; }
  .ats .avail { font-size: 8.5pt; font-style: italic; margin: 1pt 0 0; }
  .ats h2 {
    font-size: 9pt; font-weight: 700; text-transform: uppercase;
    letter-spacing: .6px; margin: 5.5pt 0 1.8pt;
    border-bottom: 0.9pt solid var(--rule); padding-bottom: 1.2pt;
  }
  .ats p { margin: 0 0 2pt; }
  .ats ul { margin: 1.5pt 0 0; padding-left: 11pt; }
  .ats li { margin: 0 0 1pt; }
  .ats .row { display: flex; justify-content: space-between; gap: 10pt; align-items: baseline; }
  .ats .jt { font-weight: 700; }
  .ats .org { font-style: italic; }
  .ats .dates { white-space: nowrap; font-size: 9pt; }
  .ats .skill { margin: 0 0 1.6pt; }
  .ats .skill b { font-weight: 700; }
  .ats a { color: inherit; text-decoration: none; }
  @page { size: A4; margin: 0; }
`;

export default function CvPrint() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="ats">
        <h1>{cv.name}</h1>
        <p className="role">{cv.headline}</p>
        <p className="meta">{cv.contact.join(" | ")}</p>
        <p className="avail">{cv.availability}</p>

        <h2>Summary</h2>
        <p>{cv.summary}</p>

        <h2>Technical Skills</h2>
        {cv.skills.map((s) => (
          <p className="skill" key={s.label}>
            <b>{s.label}:</b> {s.items}
          </p>
        ))}

        <h2>Experience</h2>
        {cv.experience.map((role) => (
          <div key={role.org} style={{ marginBottom: "4pt" }}>
            <div className="row">
              <span>
                <span className="jt">{role.title}</span>
                {" - "}
                <span className="org">
                  {role.org}, {role.location}
                </span>
              </span>
              <span className="dates">{role.dates}</span>
            </div>
            <ul>
              {role.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Projects</h2>
        {cv.projects.map((p) => (
          <div key={p.title}>
            <div className="row">
              <span>
                <span className="jt">{p.title}</span>
                {" - "}
                <span className="org">{p.stack}</span>
              </span>
              <span className="dates">{p.link}</span>
            </div>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Education</h2>
        <div className="row">
          <span>
            <span className="jt">{cv.education.degree}</span>
            {" - "}
            <span className="org">{cv.education.org}</span>
          </span>
          <span className="dates">{cv.education.dates}</span>
        </div>
        <p>{cv.education.detail}</p>

        <h2>Achievements &amp; Leadership</h2>
        <ul>
          {cv.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
