"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import { CldImage } from "next-cloudinary";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

export default function ProductCard({
  cloudinaryImageId,
  description,
  id,
  price,
}: Partial<Product>) {
  return (
    <Card className="space-y-2">
      {/* <CardHeader> */}
      <CldImage
        width={1000}
        height={1000}
        src={cloudinaryImageId as string}
        crop="thumb"
        gravity="center"
        placeholder="blur"
        blurDataURL="/small_logo.webp"
        alt={description as string}
        className="rounded-t"
      />
      {/* </CardHeader> */}
      <CardContent className="text-center">
        <CardDescription className="line-clamp-2 overflow-hidden text-ellipsis">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2">
        <strong className="text-2xl">{formatPrice(price as number)}</strong>
        <Button className="flex w-full items-center gap-2 font-semibold">
          <ShoppingBag /> Agregar al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
