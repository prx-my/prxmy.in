import { profile } from "@/content";

export function Wordmark() {
  return <span className="brand-wordmark">{profile.brand}<span className="brand-period">.</span></span>;
}
