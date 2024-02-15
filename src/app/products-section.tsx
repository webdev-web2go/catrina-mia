import ProductsContainer from "@/components/products-container";
import SectionHeader from "@/components/section-header";
import { getProducts } from "@/lib/drizzle";
import type { Product } from "@/server/db/schema";

export default async function ProductsSection() {
  const products = await getProducts(true);
  return (
    <section className="space-y-6 antialiased">
      <SectionHeader
        className="items-center"
        title="Calidad y elegancia"
        subtitle="Los mejores productos para tus eventos ó sesiones"
        description="En Catrina mía encontrarás un tocado hermoso para cualquier ocasión, discreto ó llamativo según to preferencia"
        isMainTitle
        centerTitle
      />
      <ProductsContainer products={products as Product[]} />
    </section>
  );
}
