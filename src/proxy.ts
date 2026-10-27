import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/content";

const slugs = new Set(projects.map((project) => project.slug));

// cacheComponents rules out dynamicParams = false, so an unknown slug would
// stream a 200 before the page's notFound() runs. Answer it with a real 404 here.
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (!slugs.has(slug)) return NextResponse.rewrite(new URL("/404", request.url));
}

export const config = { matcher: "/projects/:slug" };
