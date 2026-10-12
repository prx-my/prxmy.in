import type { Metadata } from "next";
import { awsVideo } from "@/content";

export const metadata: Metadata = {
  title: "aws~env · video",
  robots: { index: false },
};

export default function AwsEnvVideo() {
  return (
    <main className="h-dvh w-full bg-ink">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${awsVideo.id}?rel=0`}
        title={awsVideo.title}
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="size-full"
      />
    </main>
  );
}
