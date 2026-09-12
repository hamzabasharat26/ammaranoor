/* ============================================================
   build-media-ammara.mjs — the only path from docs/drive/ammara/
   into public/media/ammara/.

   Same rules as build-media.mjs:
   - images -> .jpg (mozjpeg) + .webp, capped width, EXIF rotation applied
   - videos -> .webm (VP9) + .mp4 (H.264), ALWAYS -an (no audio), short
     window, plus a poster JPG cut from the same window

   Source files are Ammara's own photographs and phone video. Nothing here
   is stock and nothing is generated.

   Usage: node scripts/build-media-ammara.mjs [--force]
   ============================================================ */

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "docs/drive/ammara");
const OUT = path.join(ROOT, "public/media/ammara");
const FORCE = process.argv.includes("--force");

const S = (p) => path.join(SRC, p);
const ff = (args) => execFileSync("ffmpeg", ["-y", "-v", "error", ...args]);
const exists = (p) => fs.existsSync(p);
const kb = (p) => (fs.statSync(p).size / 1024).toFixed(0) + "KB";
fs.mkdirSync(OUT, { recursive: true });

/** image -> <out>.jpg + <out>.webp. `crop` is an optional aspect (w/h) that
 *  centre-crops before the resize, so a landscape frame can ship as a portrait
 *  card without the browser doing the cropping. */
async function image(src, name, { width = 1400, q = 80, crop, cropRight } = {}) {
  if (!exists(src)) return console.warn("  ! missing", src);
  const out = path.join(OUT, name);
  if (!FORCE && exists(out + ".jpg")) return console.log("  = ", name);

  let pipe = sharp(src, { failOn: "none" }).rotate();
  if (cropRight) {
    // Keep the rightmost `cropRight` fraction of the frame.
    const { width: w, height: h } = await pipe.metadata();
    // Derive the width from the offset, never round both independently — an
    // odd source width makes left + width overflow by a pixel and sharp
    // rejects the whole extract.
    const left = Math.round(w * (1 - cropRight));
    pipe = pipe.extract({ left, top: 0, width: w - left, height: h });
  }
  if (crop) {
    const { width: w, height: h } = await pipe.metadata();
    const target = crop;
    let cw = w;
    let ch = Math.round(w / target);
    if (ch > h) {
      ch = h;
      cw = Math.round(h * target);
    }
    pipe = pipe.extract({
      left: Math.round((w - cw) / 2),
      top: Math.round((h - ch) / 2),
      width: cw,
      height: ch,
    });
  }
  const base = pipe.resize({ width, withoutEnlargement: true });
  await base.clone().jpeg({ quality: q, mozjpeg: true }).toFile(out + ".jpg");
  await base.clone().webp({ quality: q - 4 }).toFile(out + ".webp");
  console.log(`  + ${name}.{jpg,webp}  ${kb(out + ".jpg")}`);
}

/** video -> <out>.webm + <out>.mp4 + <out>.jpg poster. Always muted. */
function clip(src, name, { start = 0, dur = 5, w = 640, posterAt, crf = 46, x264 = 32 } = {}) {
  if (!exists(src)) return console.warn("  ! missing", src);
  const out = path.join(OUT, name);
  if (!FORCE && exists(out + ".webm")) return console.log("  = ", name);
  // Handheld phone footage is grainy and expensive to encode. `hqdn3d` denoises
  // before the scale so the encoder is not spending bitrate on sensor noise —
  // without it these two clips land at 700-900 KB, three times the budget.
  const vf = `hqdn3d=4:3:6:4,scale='min(${w},iw)':-2:flags=lanczos,fps=24`;
  const common = ["-ss", String(start), "-t", String(dur), "-i", src, "-an", "-vf", vf];
  ff([...common, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", String(crf), "-row-mt", "1", "-pix_fmt", "yuv420p", out + ".webm"]);
  ff([...common, "-c:v", "libx264", "-profile:v", "high", "-crf", String(x264), "-preset", "veryslow", "-movflags", "+faststart", "-pix_fmt", "yuv420p", out + ".mp4"]);
  ff(["-ss", String(posterAt ?? start + dur / 2), "-i", src, "-vframes", "1", "-vf", vf, "-q:v", "3", out + ".jpg"]);
  console.log(`  + ${name}.{webm,mp4,jpg}  ${kb(out + ".webm")} / ${kb(out + ".mp4")}`);
}

console.log("portrait");
// Landscape source, centre-cropped two ways: a 4:5 card for the About section
// and a square for the hero's foreground plate.
await image(S("picture_profile.jpeg"), "portrait", { width: 1000, q: 82, crop: 4 / 5 });
await image(S("picture_profile.jpeg"), "portrait-square", { width: 800, q: 82, crop: 1 });

console.log("textile asia");
await image(S("Testile_expo_my_pic.jpeg"), "textile-asia-stand", { width: 1100, q: 78 });
await image(S("Textile in Asia Lahore (1).jpeg"), "textile-asia-portrait", { width: 1100, q: 78 });
await image(S("WhatsApp Image 2026-09-02 at 1.04.51 AM (1).jpeg"), "magicqc-team", { width: 1400, q: 78 });

console.log("ieee");
await image(S("IEEE_wie_Chair_person_.jpeg"), "ieee-day-team", { width: 1100, q: 78 });
await image(S("ay _IEEE_event.jpeg"), "ieee-day-stage", { width: 1100, q: 78 });

console.log("awards");
await image(S("Competion _ win_of_AI_applicatin.jpeg"), "ai-competition-award", { width: 1100, q: 78 });
await image(S("Competion _ win_of_AI_applicatin (2).jpeg"), "ai-competition-stage", { width: 1100, q: 78 });
await image(S("Abassador_of_6th international_convention_medal_win.jpeg"), "isce-ambassador", { width: 1000, q: 78 });

console.log("university");
await image(S("meeting_with_reactor_nuttech_on_for AI_programs _in university.jpeg"), "rector-ai-programs", { width: 1400, q: 78 });

// --- Project work ---------------------------------------------------------
// Ammara's own product and field material. Two files from the drone folder are
// deliberately NOT ingested: Mission.jpeg and Q_Ground_mission_plan.jpeg are
// QGroundControl plans showing GPS waypoints over a real, identifiable site.
// The airframe photo and the Gazebo simulation say the same thing about the
// work without publishing that.
const ZD = "zips/drone/Drone HEXA/";
const ZM = "zips/magicqc/Product (Magic QC) Size Measurement /";
const ZR = ZM + "Deployed Magic QC (MEB) karachi industry/";

console.log("magicqc");
// The desktop app's left rail is a row of third-party brand logos (Adidas,
// Puma, Under Armour, Reebok, Zara, Pull&Bear) configured as sample clients.
// Those are not cleared to publish, so the frame is cropped to the live
// measurement panel — which is the part that shows the engineering anyway.
await image(S("MagicQC_desktop_app.png"), "magicqc-desktop", { width: 1100, q: 80, cropRight: 0.5 });
await image(S("magic_online_web_app.png"), "magicqc-web", { width: 1400, q: 80 });
await image(S(ZM + "measurement.jpeg"), "magicqc-measure", { width: 1200, q: 80 });
await image(S(ZM + "half t shirt measurement.jpg"), "magicqc-measure-shirt", { width: 1200, q: 80 });
await image(S(ZM + "trouser mesure ment.jpg"), "magicqc-measure-trouser", { width: 1200, q: 80 });
await image(S(ZR + "WhatsApp Image 2026-08-08 at 3.22.45 PM.jpeg"), "magicqc-stand", { width: 1400, q: 78 });
await image(S(ZR + "WhatsApp Image 2026-08-08 at 3.22.46 PM.jpeg"), "magicqc-rig", { width: 1400, q: 78 });

console.log("fabric");
await image(S("WhatsApp Image 2026-07-19 at 9.50.00 PM.jpeg"), "fabric-rig", { width: 1400, q: 78 });
await image(S("fabric_IOU_fusion_frame1022.jpg"), "fabric-fusion-1", { width: 1200, q: 82 });
await image(S("frame_0092_jpg.rf.89a5f7dc5423a6c1425abcc28cf84891_panel.jpg"), "fabric-fusion-2", { width: 1200, q: 82 });

console.log("uav + parking");
await image(S("Pakring_dasboard.jpg"), "parking-dashboard", { width: 1400, q: 80 });
await image(S("Dynamic_Parking_System.png"), "parking-allocation", { width: 1400, q: 80 });
await image(S("People_counting.png"), "people-count", { width: 1400, q: 78 });
await image(S("Interction_detection_peoples.png"), "interaction-track", { width: 1400, q: 78 });
await image(S("Detection_outside.png"), "street-detect", { width: 1400, q: 78 });
await image(S(ZD + "Drove upper view.png"), "drone-airframe", { width: 1400, q: 80 });
await image(S(ZD + "Gazebo_Quad_Drone.png"), "drone-sim", { width: 1400, q: 80 });

console.log("llm");
await image(S("Nexus_AI_RAG_Chatbot.png"), "rag-chatbot", { width: 1400, q: 80 });
await image(S("OCR1.png"), "ocr-extraction", { width: 1200, q: 80 });

console.log("sports");
await image(S("hero.jpg"), "rally-hero", { width: 1400, q: 80 });
await image(S("dashboard.jpg"), "rally-dashboard", { width: 1400, q: 80 });

console.log("clips");
// The deployed measurement rig running on the floor at MEB Karachi.
// The deployed measurement rig running on the floor at MEB Karachi.
clip(S(ZR + "WhatsApp Video 2026-08-08 at 3.22.44 PM.mp4"), "magicqc-rig-run", { start: 0, dur: 5, w: 640, posterAt: 2 });
// The NSC result announcement, in full and from the top — the walk to the
// podium is what makes the hall reaction mean anything, so this one is not
// trimmed to a loop. It is hover-play behind preload="none", so the extra
// bytes are only fetched when a visitor actually asks for it.
clip(S("win_chief_coordinator_NSC_nutech.mp4"), "nsc-result", { start: 0, dur: 18.1, w: 360, posterAt: 11, crf: 48, x264: 34 });
// IEEE Day, Islamabad Section — the full 4.7s take.
clip(S("celebration_of_my_of_wie_chair_IEEE_.mp4"), "ieee-day", { start: 0, dur: 4.7, w: 560, posterAt: 2 });

console.log("\ndone — public/media/ammara/");
