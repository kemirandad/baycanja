import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 200"
    className={cn("h-8 w-8", className)}
    aria-label="Logo SFJ"
  >
    <rect width="200" height="200" rx="30" fill="hsl(var(--primary))" />
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize="90"
      fontWeight="bold"
      fill="hsl(var(--primary-foreground))"
      fontFamily="sans-serif"
    >
      SFJ
    </text>
  </svg>
);