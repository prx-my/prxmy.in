"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import type { Link } from "@/content";

export function QuickNavigation({ items }: { items: Link[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const [query, setQuery] = useState("");
  const titleId = useId();
  const searchId = useId();
  const results = items.filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));

  function open() {
    setQuery("");
    dialog.current?.showModal();
    input.current?.focus();
  }

  useEffect(() => {
    function shortcut(event: globalThis.KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialog.current?.open) dialog.current.close();
        else open();
      }
    }
    document.addEventListener("keydown", shortcut);
    return () => document.removeEventListener("keydown", shortcut);
  }, []);

  function navigate(event: KeyboardEvent, index: number) {
    if (!results.length) return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const next = index < 0
        ? event.key === "ArrowDown" ? 0 : results.length - 1
        : (index + (event.key === "ArrowDown" ? 1 : -1) + results.length) % results.length;
      links.current[next]?.focus();
    } else if (event.key === "Enter" && index === -1) {
      event.preventDefault();
      links.current[0]?.click();
    }
  }

  return (
    <>
      <button type="button" className="index-trigger" onClick={open} aria-haspopup="dialog" aria-keyshortcuts="Meta+k Control+k">
        <span className="index-trigger-label">Explore</span><kbd aria-hidden="true"><span>⌘</span>K</kbd>
        <span className="sr-only">Open portfolio index</span>
      </button>
      <dialog ref={dialog} className="index-dialog" aria-labelledby={titleId}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
        <div className="index-dialog-content">
          <div className="index-dialog-heading">
            <h2 id={titleId}>Portfolio index</h2>
            <button type="button" className="index-close" aria-label="Close portfolio index" onClick={() => dialog.current?.close()}>×</button>
          </div>
          <label htmlFor={searchId} className="sr-only">Search sections and links</label>
          <input ref={input} id={searchId} type="search" placeholder="Find a section or link…" value={query}
            onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => navigate(event, -1)} autoComplete="off" />
          <nav aria-label="Portfolio index" className="index-results">
            {results.map((item, index) => (
              <a key={item.href} href={item.href} ref={(element) => { links.current[index] = element; }}
                {...(item.href.startsWith("https:") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                onClick={() => dialog.current?.close()} onKeyDown={(event) => navigate(event, index)}>
                <span>{item.label}</span><span aria-hidden="true">{item.href.startsWith("#") ? "↓" : "↗"}</span>
              </a>
            ))}
            {!results.length && <p role="status">No matching sections or links.</p>}
          </nav>
          <p className="index-help">↑ ↓ to explore <span>Enter to open</span><span>Esc to close</span></p>
        </div>
      </dialog>
    </>
  );
}
