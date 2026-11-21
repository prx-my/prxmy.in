import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import { awsVideo } from "@/content";

export const metadata: Metadata = {
  title: { absolute: "EcoAudit — Project demonstration" },
  description: "Watch the EcoAudit team’s project demonstration.",
  applicationName: "EcoAudit",
  alternates: { canonical: "/ecoaudit/video" },
  openGraph: { title: "EcoAudit — Project demonstration", description: "Watch the EcoAudit team’s project demonstration.", url: "/ecoaudit/video", siteName: "EcoAudit", type: "website", images: [{ url: "/portfolio/ecoaudit.jpg", alt: "EcoAudit project introduction" }] },
  twitter: { card: "summary_large_image", title: "EcoAudit — Project demonstration", description: "Watch the EcoAudit team’s project demonstration.", images: ["/portfolio/ecoaudit.jpg"] },
  robots: { index: false },
};

export default function AwsEnvVideo() {
  return (
    <main className="flex h-dvh w-full flex-col" style={{ background: "#0d0d0d", color: "#f4f4f4", colorScheme: "dark" }}>
      <nav aria-label="Video navigation" className="flex h-14 shrink-0 items-center px-5">
        <Link href="/ecoaudit#demo" className="inline-flex min-h-11 items-center gap-2 text-sm hover:underline focus-visible:outline-2 focus-visible:outline-neutral-200">
          <FiArrowLeft aria-hidden="true" />Back to EcoAudit
        </Link>
      </nav>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${awsVideo.id}?rel=0`}
        title={awsVideo.title}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="min-h-0 w-full flex-1 border-0"
      />
    </main>
  );
}
