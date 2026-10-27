import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/content";

export const alt = "Prakhar Gupta — Backend & Full-Stack Developer. Client work, open source, and independent builds.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const font = readFile(join(process.cwd(), "src/assets/fonts/BodoniModa-Black.ttf"));
const bodyFont = readFile(join(process.cwd(), "src/assets/fonts/Geist-Regular.ttf"));
const artwork = readFile(join(process.cwd(), "public/art/the-night-shift-og.jpg"));

export default async function OpenGraphImage() {
  const [headlineFont, sansFont, art] = await Promise.all([font, bodyFont, artwork]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#f2ebdc", color: "#191714", fontFamily: "Geist", borderTop: "8px solid #c13529", padding: "48px", position: "relative" }}>
      <div style={{ display: "flex", flexDirection: "column", width: 660, paddingTop: 8 }}>
        <div style={{ display: "flex", fontFamily: "Bodoni", fontWeight: 900, fontSize: 36, lineHeight: 1, letterSpacing: -2, marginBottom: 32 }}>{profile.brand}<span style={{ color: "#c13529" }}>.</span></div>
        <div style={{ display: "flex", fontFamily: "Bodoni", fontWeight: 900, fontSize: 108, lineHeight: .95, letterSpacing: -5 }}>PRAKHAR</div>
        <div style={{ display: "flex", fontFamily: "Bodoni", fontWeight: 900, fontSize: 108, lineHeight: .95, letterSpacing: -5 }}>GUPTA</div>
        <div style={{ display: "flex", fontSize: 27, marginTop: 30 }}>Backend & full-stack developer</div>
        <div style={{ display: "flex", height: 1, background: "#191714", width: 590, marginTop: 36, marginBottom: 22 }} />
        <div style={{ display: "flex", fontSize: 19, color: "#696055" }}>Client work · Open source · Independent builds</div>
      </div>
      <div style={{ display: "flex", position: "absolute", right: 48, top: 48, width: 400, height: 514, border: "3px solid #191714", boxShadow: "8px 8px 0 #e5d8bf", transform: "rotate(1deg)", overflow: "hidden" }}>
        {/* ImageResponse renders a plain image without the Next.js image loader. */}
        <img src={`data:image/jpeg;base64,${art.toString("base64")}`} width={400} height={514} style={{ objectFit: "cover" }} alt="" />
      </div>
      <div style={{ display: "flex", position: "absolute", right: 275, top: 76, padding: "14px 20px", background: "#bd3328", color: "#fff3df", fontSize: 16, letterSpacing: 2, transform: "rotate(-4deg)" }}>THE NIGHT SHIFT</div>
    </div>,
    { ...size, fonts: [{ name: "Bodoni", data: headlineFont, style: "normal", weight: 900 }, { name: "Geist", data: sansFont, style: "normal", weight: 400 }] },
  );
}
