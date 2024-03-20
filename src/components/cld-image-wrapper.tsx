"use client";

import { CldImage } from "next-cloudinary";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLImageElement> {
  id: string;
  description: string;
  priority?: boolean;
}

export default function CldImageWrapper({
  id,
  description,
  priority = false,
  ...props
}: Props) {
  return (
    <CldImage
      width={1000}
      height={1000}
      src={id}
      crop="thumb"
      gravity="center"
      placeholder="blur"
      blurDataURL="/small_logo.webp"
      alt={description}
      priority={priority}
      {...props}
    />
  );
}
