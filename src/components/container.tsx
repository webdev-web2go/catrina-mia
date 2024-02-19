import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

export default function Container({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mx-auto max-w-7xl px-2 xl:px-0", className)}>
      {children}
    </div>
  );
}
