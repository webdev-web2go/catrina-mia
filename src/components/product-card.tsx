"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import { CldImage } from "next-cloudinary";
import { ShoppingBag } from "lucide-react";
import { addToCartAction } from "@/actions/cart-actions";
import SubmitButton from "./submit-button";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

export default function ProductCard({
  cloudinaryImageId,
  description,
  id,
  price,
}: Pick<Product, "id" | "description" | "cloudinaryImageId" | "price">) {
  const pathname = usePathname();

  const addToCart = async () => {
    const result = await addToCartAction(id, pathname);

    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
      });
    } else if (result.info) {
      toast.info(result.info, {
        style: { background: "#eff8ff", color: "blue", borderColor: "#d3e0fd" },
      });
    } else {
      toast.success(result.success, {
        style: {
          background: "#ecfdf3",
          color: "green",
          borderColor: "#d3fde5",
        },
      });
    }
  };

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
        <form action={addToCart} className="w-full">
          <SubmitButton
            className="w-full"
            loadingText="Agregando al carrito..."
            text={
              <>
                <ShoppingBag /> Agregar al carrito
              </>
            }
          />
        </form>
      </CardFooter>
    </Card>
  );
}
