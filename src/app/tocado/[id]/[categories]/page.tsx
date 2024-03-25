import MainProduct from "./main-product";
import SameCategoryProducts from "./same-category-products";
import Comments from "./comments";

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
        mainProductId={Number(params.id)}
      />
      <Comments />
    </main>
  );
}
