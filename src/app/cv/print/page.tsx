import type { Metadata } from "next";
import { cv } from "@/content/cv";

/**
 * The one-page ATS CV — the source of public/media/Ammara_Noor_CV.pdf.
 *
 * Styled after the Overleaf "Jake's Resume" template: centred name, a single
 * contact line, small-caps section headings over a full-width rule, bold role
 * and right-aligned dates, italic company and right-aligned location. That is
 * the layout recruiters recognise as professional.
 *
 * It remains ATS-safe by construction: one column, real selectable text, no
 * tables, images or icons, ASCII punctuation, ligatures off (the "fl" ligature
 * would turn "MLflow" into a glyph a parser cannot match).
 */
export const metadata: Metadata = {
  title: "CV (print)",
  robots: { index: false, follow: false },
};

const CSS = `
  .cv {
    background:#fff; color:#000;
    font-family: "Latin Modern Roman", "CMU Serif", Cambria, Georgia, "Times New Roman", serif;
    font-size: 9.3pt; line-height: 1.16;
    font-variant-ligatures: none; font-feature-settings: "liga" 0, "clig" 0;
    max-width: 210mm; margin: 0 auto; padding: 8mm 12mm 6mm;
  }
  .cv a { color: inherit; text-decoration: none; }
  .cv .head { text-align: center; }
  .cv h1 { font-size: 24pt; font-weight: 700; font-variant: small-caps; letter-spacing: .5px; margin: 0; line-height: 1; }
  .cv .title { font-size: 10.5pt; font-weight: 700; margin: 3pt 0 0; }
  .cv .contact { font-size: 9pt; margin: 2.5pt 0 0; }
  .cv .contact span + span::before { content: " | "; }
  .cv .loc { font-size: 9pt; margin: 1pt 0 0; font-style: italic; }
  .cv h2 {
    font-size: 11pt; font-weight: 700; font-variant: small-caps; letter-spacing: .4px;
    margin: 6pt 0 2.5pt; padding-bottom: 1pt; border-bottom: .8pt solid #000;
  }
  .cv p { margin: 0; }
  .cv .row { display: flex; justify-content: space-between; align-items: baseline; gap: 8pt; }
  .cv .b { font-weight: 700; }
  .cv .i { font-style: italic; }
  .cv .entry { margin: 0 0 3pt; }
  /* Tailwind's preflight sets list-style:none globally; restore real bullets. */
  .cv ul { margin: 1pt 0 0; padding-left: 12pt; list-style: disc outside; }
  .cv li { margin: 0 0 .8pt; }
  .cv .skills p { margin: 0 0 1pt; }
  @page { size: A4; margin: 0; }
`;

export default function CvPrint() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <main className="cv">
        <header className="head">
          <h1>{cv.name}</h1>
          <p className="title">{cv.headline}</p>
          <p className="contact">
            {cv.contact.map((c) => (
              <span key={c.text}>{"href" in c ? <a href={c.href}>{c.text}</a> : c.text}</span>
            ))}
          </p>
          <p className="loc">{cv.location}</p>
        </header>

        <h2>Summary</h2>
        <p>{cv.summary}</p>

        <h2>Technical Skills</h2>
        <div className="skills">
          {cv.skills.map((s) => (
            <p key={s.label}>
              <span className="b">{s.label}:</span> {s.items}
            </p>
          ))}
        </div>

        <h2>Experience</h2>
        {cv.experience.map((r) => (
          <div className="entry" key={r.org}>
            <div className="row">
              <span className="b">{r.title}</span>
              <span>{r.dates}</span>
            </div>
            <div className="row">
              <span className="i">{r.org}</span>
              <span className="i">{r.location}</span>
            </div>
            <ul>
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Projects</h2>
        {cv.projects.map((p) => (
          <div className="entry" key={p.title}>
            <div className="row">
              <span>
                <span className="b">{p.title}</span> | <span className="i">{p.stack}</span>
              </span>
              <span>{p.date}</span>
            </div>
            <ul>
              {p.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Education</h2>
        <div className="entry">
          <div className="row">
            <span className="b">{cv.education.org}</span>
            <span>{cv.education.location}</span>
          </div>
          <div className="row">
            <span className="i">{cv.education.degree}</span>
            <span className="i">{cv.education.dates}</span>
          </div>
          <p>{cv.education.detail}</p>
        </div>

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
