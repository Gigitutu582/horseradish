import { ReactNode, ButtonHTMLAttributes } from "react";

interface VintageButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
}

export default function VintageButton({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "",
  ...props 
}: VintageButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:shadow-[4px_4px_0_rgba(0,0,0,1)]",
    accent: "bg-accent text-accent-foreground hover:shadow-[4px_4px_0_rgba(0,0,0,1)]",
    outline: "bg-card text-foreground hover:shadow-[3px_3px_0_rgba(0,0,0,1)]",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`
        border-2 border-black transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      style={{ fontFamily: "'Montserrat', sans-serif" }}
      {...props}
    >
      {children}
    </button>
  );
}
