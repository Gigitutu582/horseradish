import { ReactNode } from "react";

interface VintageBadgeProps {
  children: ReactNode;
  variant?: "primary" | "accent" | "muted";
  size?: "sm" | "md" | "lg";
}

export default function VintageBadge({ children, variant = "primary", size = "md" }: VintageBadgeProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    muted: "bg-muted text-muted-foreground",
  };

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  return (
    <span 
      className={`
        inline-block border-2 border-black
        ${variants[variant]}
        ${sizes[size]}
      `}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      {children}
    </span>
  );
}
