import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import AddToCart from "./cart/add-to-cart";
import CldImageWrapper from "./cld-image-wrapper";

export default function ProductCard({
  cloudinaryImageId,
  description,
  id,
  price,
}: Pick<Product, "id" | "description" | "cloudinaryImageId" | "price">) {
  return (
    <Card className="space-y-2">
      <CldImageWrapper description={description} id={cloudinaryImageId} />
      <CardContent className="text-center">
        <CardDescription className="line-clamp-2 overflow-hidden text-ellipsis text-foreground">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col gap-2">
        <strong className="text-2xl">{formatPrice(price as number)}</strong>
        <AddToCart id={id} />
      </CardFooter>
    </Card>
  );
}
