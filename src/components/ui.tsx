import type { ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mt-20 scroll-mt-16">
      <h2 className="mb-6 font-serif text-[1.6rem] leading-none tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

export function ExtLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`link ${className}`}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

export function Arrow() {
  return (
    <span aria-hidden className="ml-0.5 inline-block text-faint">
      ↗
    </span>
  );
}
