import CustomOrder from "./custom-order";
import MainHero from "./hero";
import ProductsSection from "./products-section";

export default async function HomePage() {
  return (
    <main className="flex flex-col gap-20 md:gap-32">
      <MainHero />
      <ProductsSection />
      <CustomOrder />
    </main>
  );
}
