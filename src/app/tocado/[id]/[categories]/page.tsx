import AddToCart from "@/components/cart/add-to-cart";
import CldImageWrapper from "@/components/cld-image-wrapper";
import Container from "@/components/container";
import ProductsCarousel from "@/components/products-carousel";
import SectionHeader from "@/components/section-header";
import { getProductById, getProducts } from "@/lib/drizzle/product";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import MainProduct from "./main-product";
import SameCategoryProducts from "./same-category-products";

export default async function HeadbandPage({
  params,
}: {
  params: { id: string; categories: string };
}) {
  return (
    <main className="flex flex-col gap-20 md:gap-32">
      <MainProduct id={Number(params.id)} />
      <SameCategoryProducts
        categories={decodeURIComponent(params.categories).split(",")}
      />
    </main>
  );
}
