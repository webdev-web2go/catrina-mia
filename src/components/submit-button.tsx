"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loadingText: string;
  text: string;
}

export default function SubmitButton({
  loadingText,
  text,
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus();
  return (
    <Button
      {...props}
      className={cn("flex items-center justify-center gap-2", className)}
      disabled={pending}
    >
      {pending ? loadingText : text}{" "}
      {pending && (
        <span className="animate-spin">
          <Loader2 />
        </span>
      )}
    </Button>
  );
}
