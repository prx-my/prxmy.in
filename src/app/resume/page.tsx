import type { Metadata } from "next";
import { ResumeFrame } from "@/components/resume-frame";

export const metadata: Metadata = {
  title: "Résumé · Prakhar Gupta",
  description: "Résumé of Prakhar Gupta, backend and full-stack developer based in Jaipur, India.",
  alternates: { canonical: "/resume" },
};

export default function Resume() {
  return <ResumeFrame name="Prakhar" file="/prakhar-resume.pdf" />;
}
