import ProductsCarousel from "@/components/products-carousel";
import SectionHeader from "@/components/section-header";
import { getProducts } from "@/lib/drizzle/product";
import type { Product } from "@/server/db/schema";

export default async function SameCategoryProducts({
  categories,
}: {
  categories: string[];
}) {
  const sameCategoryProducts = (await getProducts(true))?.filter((prod) =>
    categories.some((cat) => prod.categories.includes(cat)),
  ) as Product[];
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Productos de la misma categoría"
        subtitle="También te podría interesar"
        className="md:px-36"
      />
      <ProductsCarousel products={sameCategoryProducts} />
    </section>
  );
}
