import CldImageWrapper from "@/components/cld-image-wrapper";
import { getProductById } from "@/lib/drizzle/product";
import type { Product } from "@/server/db/schema";

export default async function HeadbandPage({
  params,
}: {
  params: { id: string };
}) {
  const { cloudinaryImageId, description } = (await getProductById(
    Number(params.id),
  )) as Product;
  return (
    <main>
      <CldImageWrapper id={cloudinaryImageId} description={description} />
    </main>
  );
}
