import { getProductById } from "@/lib/drizzle/product";
import type { Category, Product } from "@/server/db/schema";
import CldImageWrapper from "../cld-image-wrapper";
import { formatPrice } from "@/lib/utils";
import RemoveFromCart from "./remove-item";
import { getCategoryById } from "@/lib/drizzle/category";

export default async function CartItem({
  description,
  cloudinaryImageId,
  price,
  category,
  id,
}: Pick<Product, "id" | "cloudinaryImageId" | "description" | "price"> & {
  category: string;
}) {
  return (
    <article className="relative flex gap-2 text-sm antialiased">
      <RemoveFromCart id={id} />
      <CldImageWrapper
        id={cloudinaryImageId}
        description={description}
        className="size-32 rounded-md"
      />
      <div className="flex flex-col justify-between p-2">
        <header>
          <span className="font-semibold">Categoría: {category}</span>
          <p className="line-clamp-2 overflow-hidden text-ellipsis">
            {description}
          </p>
        </header>
        <footer className="mt-auto">
          <strong className="text-xl">{formatPrice(price)}</strong>
        </footer>
      </div>
    </article>
  );
}
