"use client";

// Adapted from the cloned Ashutoshx7/Portfolio-v2- RightNavbar component.
import { useEffect, useState } from "react";
import type { Link } from "@/content";

export function RightNavbar({ items }: { items: Link[] }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActiveSection(entry.target.id);
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    for (const link of items) {
      const section = document.getElementById(link.href.slice(1));
      if (section) observer.observe(section);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="reference-index" aria-label="Section index">
      <p>Index</p>
      {items.map((link) => (
        <a key={link.href} href={link.href} aria-current={activeSection === link.href.slice(1) ? "location" : undefined}>
          <span aria-hidden="true" />{link.label}
        </a>
      ))}
    </nav>
  );
}
