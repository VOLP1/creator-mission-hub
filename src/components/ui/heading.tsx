import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HeadingVariant = "hero" | "section" | "sub" | "stat";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
  variant?: HeadingVariant;
  /** Remove default bottom margin */
  noMargin?: boolean;
}

// Centralized responsive scales to keep consistency across pages.
// Mobile-first sizes chosen to avoid overflow in narrow screens.
const variantClasses: Record<HeadingVariant, string> = {
  hero: "font-sans font-bold tracking-tight text-3xl sm:text-4xl md:text-6xl lg:text-7xl", // aligns with .text-hero adjustments
  section: "font-sans font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
  sub: "font-sans font-semibold text-xl sm:text-2xl md:text-3xl", // smaller supporting headings
  stat: "font-sans font-bold tabular-nums text-4xl sm:text-5xl md:text-6xl lg:text-7xl", // for numbers / KPIs
};

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(function Heading(
  { as = "h2", variant = "section", className, children, noMargin, ...rest },
  ref
) {
  const Comp = as as any;
  return (
    <Comp
      ref={ref}
      className={cn(
        variantClasses[variant],
        !noMargin && "mb-6",
        // Color is left to parent; add good default contrast if none provided
        "text-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});

export default Heading;