import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { HTMLAttributes } from "react";
import Container from "./container";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle: string;
  description: string;
  isMainTitle?: boolean;
  centerTitle?: boolean;
}

export default function SectionHeader({
  title,
  subtitle,
  description,
  isMainTitle = false,
  centerTitle = false,
  className,
}: Props) {
  return (
    <Container>
      <header
        className={cn("flex flex-col gap-4 antialiased md:px-36", className)}
      >
        <div
          className={cn(
            "flex w-full flex-col gap-2",
            centerTitle && "items-center",
          )}
        >
          <Badge className="text-xs sm:text-sm">{subtitle}</Badge>
          {isMainTitle ? (
            <h1
              className={cn(
                "w-full border-b-2 border-primary/80 pb-2 text-4xl font-medium sm:text-5xl",
                centerTitle && "text-center",
              )}
            >
              {title}
            </h1>
          ) : (
            <h2
              className={cn(
                "w-full border-b-2 border-primary/80 pb-2 text-4xl font-medium sm:text-5xl",
                centerTitle && "text-center",
              )}
            >
              {title}
            </h2>
          )}
        </div>
        <p
          className={cn(
            "max-w-prose text-sm text-muted-foreground sm:text-base",
            centerTitle && "text-center",
          )}
        >
          {description}
        </p>
      </header>
    </Container>
  );
}
