// Hand-drawn loop that draws itself around its parent on hover or focus.
// The parent must be `group relative`.
export function Scribble({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute -top-2 -left-3 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] overflow-visible ${flip ? "-scale-x-100" : ""}`}
    >
      <path
        d="M11 10C28 3 68 1 90 5C101 8 99 24 88 27C65 32 24 31 8 25C-2 20 1 7 14 4C22 2.5 34 3 50 6"
        pathLength={1}
        fill="none"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-ink [stroke-dasharray:1] [stroke-dashoffset:1] transition-[stroke-dashoffset] duration-500 ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0] motion-reduce:duration-0"
      />
    </svg>
  );
}
