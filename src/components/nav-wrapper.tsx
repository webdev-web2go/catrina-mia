"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import type { HTMLAttributes } from "react";

export default function NavWrapper({
  children,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  return (
    <header
      {...props}
      id={!pathname.includes("tocado/") ? "header-nav" : ""}
      className={cn(
        "fixed top-0 z-50 flex w-full items-center justify-between px-12 py-8 text-lg text-primary-foreground antialiased",
        pathname.includes("tocado/") && "bg-black/70 backdrop-blur-[10px]",
      )}
    >
      {children}
    </header>
  );
}
