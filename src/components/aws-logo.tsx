// Brand lockup redrawn in the site's own palette: ink, beige and ivory only.
export function AwsLogo({ className = "", small = false }: { className?: string; small?: boolean }) {
  return (
    <div
      role="img"
      aria-label="Code × AWS"
      className={`inline-flex items-center gap-[0.6em] text-ink select-none ${className}`}
    >
      <svg viewBox="0 0 58 48" className={small ? "h-5 w-auto" : "h-9 w-auto"} aria-hidden>
        <polygon
          points="8,18 30,18 25,44 3,44"
          className="fill-beige stroke-ink"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M19 25 12 31 19 37"
          fill="none"
          className="stroke-ink"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="28,4 54,4 50,30 24,30"
          className="fill-ink stroke-ink"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M35 11 43 17 35 23"
          fill="none"
          className="stroke-ivory"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span aria-hidden className="font-mono text-xs text-faint">
        ×
      </span>
      <span aria-hidden className="flex flex-col items-center">
        <span className={`font-serif leading-none tracking-tight ${small ? "text-lg" : "text-3xl"}`}>aws</span>
        <svg viewBox="0 0 40 10" className="mt-0.5 h-2 w-full" fill="none">
          <path
            d="M2 2C12 8 28 8 37 2M33 1.5 37 2 35.5 6"
            className="stroke-ink"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
