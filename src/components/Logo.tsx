import { cn } from "@/lib/utils";

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    className={cn("h-8 w-8", className)}
    aria-label="Logo"
  >
    <rect width="256" height="256" fill="none" />
    <path
      d="M48,80a8,8,0,0,1,8-8H200a8,8,0,0,1,0,16H56A8,8,0,0,1,48,80Zm8,48H200a8,8,0,0,0,0-16H56a8,8,0,0,0,0,16Zm152,40H56a8,8,0,0,0,0,16H208a8,8,0,0,0,0-16Z"
      fill="hsl(var(--primary))"
    />
  </svg>
);
