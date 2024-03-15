import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn, formatPrice } from "@/lib/utils";
import type { Product } from "@/server/db/schema";
import AddToCart from "./cart/add-to-cart";
import CldImageWrapper from "./cld-image-wrapper";
import Link from "next/link";

interface Props {
  isCarousel?: boolean;
}

export default function ProductCard({
  cloudinaryImageId,
  description,
  id,
  price,
  isCarousel = false,
}: Pick<Product, "id" | "description" | "cloudinaryImageId" | "price"> &
  Props) {
  return (
    <Link href={`/tocado/${id}`}>
      <Card
        className={cn(
          "space-y-2 overflow-hidden ",
          isCarousel && "w-[300px] sm:w-[340px]",
        )}
      >
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
    </Link>
  );
}
