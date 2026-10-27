import type { Metadata } from "next";
import { Bodoni_Moda, Geist, Geist_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/content";
import { socialImage } from "@/lib/metadata";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: `${profile.name}, ${profile.role}`, template: `%s · ${profile.name}` },
  description: profile.summary,
  applicationName: profile.brand,
  openGraph: {
    title: `${profile.name} · ${profile.role}`,
    description: profile.summary,
    url: profile.site,
    siteName: `${profile.brand} · ${profile.name}`,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@_prxmy",
    title: `${profile.name} · ${profile.role}`,
    description: profile.summary,
    images: [socialImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} ${bodoni.variable} antialiased`}
    >
      <body className="font-sans">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
