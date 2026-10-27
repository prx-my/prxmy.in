import { SiNextdotjs, SiReact, SiTypescript, SiPython, SiFastapi, SiPostgresql, SiSupabase, SiRedis, SiNodedotjs, SiDocker, SiVite, SiGit, SiGithub } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import type { IconType } from "react-icons";

const icons: Record<string, IconType> = {
  "Next.js": SiNextdotjs, React: SiReact, TypeScript: SiTypescript, Python: SiPython,
  FastAPI: SiFastapi, PostGIS: SiPostgresql, PostgreSQL: SiPostgresql, Supabase: SiSupabase,
  Redis: SiRedis, "Node.js": SiNodedotjs, Docker: SiDocker, Vite: SiVite,
  "AWS Lambda": FaAws, "API Gateway": FaAws, S3: FaAws,
  Git: SiGit, GitHub: SiGithub,
};
export function Technology({ name }: { name: string }) {
  const Icon = icons[name];
  return <span className="technology-chip">{Icon && <Icon aria-hidden="true" />}<span>{name}</span></span>;
}
