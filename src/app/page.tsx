import Hero from "./hero";
import ProductsSection from "./products-section";

export default async function HomePage() {
  return (
    <main className="flex flex-col gap-16">
      <Hero />
      <ProductsSection />
      <div>FOOTER</div>
    </main>
  );
}
