"use client";
import React from "react";
// Adapted from Ashutoshx7/Portfolio-v2-; original layered button treatment retained.
import { cn } from "@/lib/utils";

export type SoftPillVariant = "secondary" | "primary";

interface SoftPillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: SoftPillVariant;
  as?: React.ElementType;
  href?: string;
  target?: string;
  rel?: string;
}

const SoftPillButton = React.forwardRef<HTMLButtonElement, SoftPillButtonProps>(
  ({ className, children, variant = "secondary", as: Comp = "button", ...props }, ref) => {
    const isPrimary = variant === "primary";
    return (
      <Comp
        ref={ref}
        className={cn(
          "group relative block rounded-[4px] text-center px-5 py-2.5 text-[13px] font-medium tracking-tight transition-[transform] duration-200 active:scale-[0.99] active:duration-[50ms]",
          "[backdrop-filter:blur(6px)]",
          isPrimary ? "text-ivory" : "text-ink",
          className,
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 rounded-[4px] overflow-hidden transition-colors duration-200 group-active:duration-[50ms]",
            isPrimary
              ? "bg-ink group-hover:bg-accent border border-line"
              : "bg-surface group-hover:bg-beige border border-line"
          )}
        >
          {!isPrimary && (
            <span
              className="absolute inset-0 rounded-[4px] transition duration-200 bg-black/[0.02] dark:bg-transparent group-hover:bg-transparent dark:group-hover:bg-white/[0.02] group-active:bg-black/[0.04] dark:group-active:bg-white/[0.04] group-active:duration-[50ms]"
            />
          )}
          <span
            className={cn("absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms]", isPrimary ? "opacity-[0.12]" : "opacity-[0.16] dark:opacity-[0.04]")}
            style={{
              background: "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
          <span
            className={cn("absolute inset-0 transition duration-200 group-active:duration-[50ms]", isPrimary ? "opacity-[0.32]" : "opacity-[0.04] dark:opacity-[0.1]")}
            style={{
              background:
                "radial-gradient(65.62% 65.62% at 50% 100%, rgb(0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          {!isPrimary && (
            <span
              className="absolute inset-0 transition duration-200 group-active:opacity-0 group-active:duration-[50ms] opacity-[0.4] dark:opacity-[0.04]"
              style={{
                background:
                  "linear-gradient(99deg, rgba(255, 255, 255, 0) 27.7%, rgba(255, 255, 255, 0.12) 60.19%, rgba(255, 255, 255, 0) 86.06%)",
              }}
            />
          )}
          <span
            aria-hidden="true"
            className={cn("absolute inset-0 rounded-[4px] p-px", isPrimary ? "opacity-[0.24]" : "hidden")}
            style={{
              background: isPrimary
                ? "linear-gradient(rgb(255, 255, 255) 0%, rgb(153, 153, 153) 55%, rgb(255, 255, 255) 80%, rgb(153, 153, 153) 95%)"
                : "linear-gradient(transparent 0%, rgb(255, 255, 255) 55%, transparent 80%, rgb(255, 255, 255) 95%)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </span>
        <span className="relative">{children}</span>
      </Comp>
    );
  },
);

SoftPillButton.displayName = "SoftPillButton";

export default SoftPillButton;
