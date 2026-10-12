import type { Metadata } from "next";
import { ResumeFrame } from "@/components/resume-frame";

export const metadata: Metadata = { title: "Resume" };

export default function ShreyResume() {
  return <ResumeFrame name="Shrey" file="/shrey-resume.pdf" />;
}
