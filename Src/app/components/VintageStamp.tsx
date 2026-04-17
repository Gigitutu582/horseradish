import { ReactNode } from "react";

interface VintageStampProps {
  children: ReactNode;
  rotation?: number;
}

export default function VintageStamp({ children, rotation = -5 }: VintageStampProps) {
  return (
    <div
      className="inline-block border-4 border-accent p-4 relative"
      style={{
        transform: `rotate(${rotation}deg)`,
        borderStyle: "dashed",
      }}
    >
      <div className="absolute inset-0 border-2 border-accent m-1" style={{ borderStyle: "dashed" }} />
      <div 
        className="relative z-10 text-accent"
        style={{ fontFamily: "'Rubik Mono One', cursive" }}
      >
        {children}
      </div>
    </div>
  );
}
