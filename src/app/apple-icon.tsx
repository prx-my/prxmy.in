import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const font = readFile(join(process.cwd(), "src/assets/fonts/BodoniModa-Black.ttf"));

export default async function AppleIcon() {
  const headlineFont = await font;
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", background: "#efeae0", color: "#161513", fontFamily: "Bodoni", fontWeight: 900, fontSize: 76 }}>PG</div>,
    { ...size, fonts: [{ name: "Bodoni", data: headlineFont, weight: 900, style: "normal" }] },
  );
}
