import type { Metadata } from "next";
import { ResumeFrame } from "@/components/resume-frame";

export const metadata: Metadata = { title: "Resume" };

export default function ShreyasResume() {
  return <ResumeFrame name="Shreyas" file="/Shreyas_resume.pdf" />;
}
