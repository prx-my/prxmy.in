import type { Metadata } from "next";
import { ResumeFrame } from "@/components/resume-frame";

export const metadata: Metadata = { title: "Resume" };

export default function Resume() {
  return <ResumeFrame name="Prakhar" file="/prakhar-resume.pdf" />;
}
