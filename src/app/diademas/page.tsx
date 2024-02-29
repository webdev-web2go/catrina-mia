import ProductsContainer from "@/components/products-container";
import SectionHeader from "@/components/section-header";
import DiademasHero from "./hero";

export default async function DiademasPage() {
  return (
    <main className="flex flex-col gap-16">
      <DiademasHero />
      <section className="space-y-6 antialiased">
        <SectionHeader
          className="items-center"
          title="Elige tu favorita"
          subtitle="Para cualquier evento del año"
          description="Encuentra tu tocado favorito, ya sea para un evento social, sesión de fotos ó vestimenta de catrina, en Catrina mía tenemos lo indicado"
          isMainTitle
          centerTitle
        />
        <ProductsContainer />
      </section>
    </main>
  );
}
