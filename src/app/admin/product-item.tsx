"use client";

import SubmitButton from "@/components/submit-button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import { CldImage } from "next-cloudinary";
import { changeProductStatusAction } from "./product-actions";
import { toast } from "sonner";

export default function ProductItem({
  cloudinaryImageId,
  description,
  price,
  active,
  id,
}: Omit<Product, "stock" | "categoryId" | "createdAt" | "updatedAt">) {
  const changeProductStatus = async () => {
    const result = await changeProductStatusAction(id, !active);

    if (result.error) {
      toast.error(result.error, {
        style: { background: "#fff0f0", color: "red" },
      });
    } else {
      toast.success(result.success, {
        style: { background: "#ecfdf3", color: "green" },
      });
    }
  };

  return (
    <article className="grid grid-cols-[200px_1fr] items-center gap-x-4">
      <figure>
        <CldImage
          width={1000}
          height={1000}
          src={cloudinaryImageId}
          crop="thumb"
          gravity="center"
          placeholder="blur"
          blurDataURL="/small_logo.webp"
          alt={description}
          className="rounded"
        />
      </figure>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <strong className="text-3xl">{formatPrice(price)}</strong>
          <p>{description}</p>
        </div>
        <form action={changeProductStatus} className="w-full">
          <SubmitButton
            loadingText={
              active ? "Deshabilitando producto..." : "Habilitando producto..."
            }
            text={active ? "Deshabilitar producto" : "Habilitar producto"}
            className="w-full"
            variant="secondary"
          />
        </form>
      </div>
    </article>
  );
}
