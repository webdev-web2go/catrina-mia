import ProductsCarousel from "@/components/products-carousel";
import SectionHeader from "@/components/section-header";
import { getProducts } from "@/lib/drizzle/product";
import type { Product } from "@/server/db/schema";

export default async function SameCategoryProducts({
  categories,
  mainProductId,
}: {
  categories: string[];
  mainProductId: number;
}) {
  const sameCategoryProducts = (await getProducts(true))?.filter(
    (prod) =>
      categories.some((cat) => prod.categories.includes(cat)) &&
      prod.id !== mainProductId,
  ) as Product[];
  return (
    <section className="space-y-6">
      <SectionHeader
        title="Productos de la misma categoría"
        subtitle="También te podría interesar"
        className="md:px-36"
      />
      <ProductsCarousel
        products={sameCategoryProducts}
        showSeeMoreLink={false}
      />
    </section>
  );
}
