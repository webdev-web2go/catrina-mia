import AddToCart from "@/components/cart/add-to-cart";
import CldImageWrapper from "@/components/cld-image-wrapper";
import Container from "@/components/container";
import Rate from "@/components/rate";
import { getProductById } from "@/lib/drizzle/product";
import { getProductRatings } from "@/lib/drizzle/rating";
import { formatPrice } from "@/lib/utils";
import type { Product, Rating } from "@/server/db/schema";
import { StarIcon } from "lucide-react";

export default async function MainProduct({ id }: { id: number }) {
  const { cloudinaryImageId, description, categories, price, stock } =
    (await getProductById(id)) as Product;

  const ratings = (await getProductRatings(id)) as Rating[];

  const productRating =
    ratings.reduce((acc, rating) => acc + rating.value, 0) / ratings.length ||
    0;
  return (
    <section className="mt-36">
      <Container className="grid justify-items-center antialiased lg:grid-cols-2 lg:gap-6">
        <picture className="relative">
          <CldImageWrapper
            id={cloudinaryImageId}
            description={description}
            className="w-full max-w-md rounded-md"
            priority
          />
          <Rate productId={id} />
        </picture>
        <div className="flex flex-col gap-6 p-6">
          <header className="flex flex-col">
            <span
              className="flex items-center gap-1 self-end text-xl"
              title={`El tocado tiene ${productRating.toFixed(2)} estrellas`}
            >
              {productRating
                ? Math.floor(productRating) !== productRating
                  ? productRating.toFixed(2)
                  : productRating
                : 0}{" "}
              <StarIcon className="size-6" />
            </span>
            <h1 className="text-2xl font-bold">{categories.join(", ")}</h1>
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
