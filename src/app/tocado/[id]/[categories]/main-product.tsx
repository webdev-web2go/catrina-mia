import AddToCart from "@/components/cart/add-to-cart";
import CldImageWrapper from "@/components/cld-image-wrapper";
import Container from "@/components/container";
import { getProductById } from "@/lib/drizzle/product";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";

export default async function MainProduct({ id }: { id: number }) {
  const { cloudinaryImageId, description, categories, price, stock } =
    (await getProductById(id)) as Product;
  return (
    <section className="mt-36">
      <Container className="grid grid-cols-2 justify-items-center gap-6 antialiased">
        <CldImageWrapper
          id={cloudinaryImageId}
          description={description}
          className="w-full max-w-md rounded-md"
          priority
        />
        <div className="flex flex-col gap-6 p-6">
          <header>
            <p className="text-2xl font-bold">{categories.join(", ")}</p>
          </header>
          <p className="max-w-prose text-pretty">{description}</p>
          <footer className="mt-auto flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <strong className="text-4xl">{formatPrice(price)}</strong>
              <span>
                {stock} {stock && stock > 1 ? "disponibles" : "disponible"}
              </span>
            </div>
            <AddToCart id={id} />
          </footer>
        </div>
      </Container>
    </section>
  );
}
