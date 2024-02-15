import type { Product } from "@/server/db/schema";
import Container from "./container";
import ProductCard from "./product-card";

export default function ProductsContainer({
  products,
}: {
  products: Product[];
}) {
  return (
    <Container className="grid grid-cols-4 gap-4">
      {products.map(({ cloudinaryImageId, description, id, price }) => (
        <ProductCard
          key={id}
          cloudinaryImageId={cloudinaryImageId}
          description={description}
          price={price}
        />
      ))}
    </Container>
  );
}
