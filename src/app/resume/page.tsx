import type { Metadata } from "next";
import { ResumeFrame } from "@/components/resume-frame";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Résumé",
  description: "Résumé of Prakhar Gupta, backend and full-stack developer based in Jaipur, India.",
  path: "/resume",
});

export default function Resume() {
  return <ResumeFrame name="Prakhar" file="/prakhar-resume.pdf" />;
}
