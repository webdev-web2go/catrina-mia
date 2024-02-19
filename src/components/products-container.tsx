import type { Product } from "@/server/db/schema";
import Container from "./container";
import ProductCard from "./product-card";

export default function ProductsContainer({
  products,
}: {
  products: Product[];
}) {
  return (
    <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map(({ cloudinaryImageId, description, id, price }) => (
        <ProductCard
          key={id}
          id={id}
          cloudinaryImageId={cloudinaryImageId}
          description={description}
          price={price}
        />
      ))}
    </Container>
  );
}
