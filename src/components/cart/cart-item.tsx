import type { Product } from "@/server/db/schema";
import CldImageWrapper from "../cld-image-wrapper";
import { formatPrice } from "@/lib/utils";
import RemoveFromCart from "./remove-item";

export default async function CartItem({
  description,
  cloudinaryImageId,
  price,
  categories,
  id,
}: Pick<
  Product,
  "id" | "cloudinaryImageId" | "description" | "price" | "categories"
>) {
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
          <span className="font-semibold">{categories.join(", ")}</span>
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
