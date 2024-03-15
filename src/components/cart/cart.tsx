import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getProductsInCart } from "@/lib/drizzle/cart";
import { ShoppingBag } from "lucide-react";
import CartItem from "./cart-item";
import Image from "next/image";
import CheckoutButton from "./checkout-button";
import RemoveFromCart from "./remove-item";
import { formatPrice } from "@/lib/utils";

export default async function Cart() {
  const productsInCart = await getProductsInCart();

  return (
    <Sheet>
      <SheetTrigger className="relative">
        <ShoppingBag aria-label="Carrito de compras" />
        {productsInCart && productsInCart.length > 0 && (
          <span
            aria-hidden
            className="absolute right-0 top-0 block size-2 rounded-full bg-red-600"
          />
        )}
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-[450px]">
        <SheetHeader className="space-y-4">
          <div className="flex items-center gap-2">
            <SheetTitle>
              Tu carrito de compras ({productsInCart?.length})
            </SheetTitle>
            {productsInCart && productsInCart?.length! > 0 && (
              <RemoveFromCart />
            )}
          </div>
          {productsInCart?.length === 0 && (
            <SheetDescription>
              <div className="flex flex-col items-center gap-2">
                <Image
                  src="/logo.webp"
                  alt="Logo de Catrina mía"
                  width={150}
                  height={150}
                  placeholder="blur"
                  blurDataURL="/small_logo.webp"
                  className="rounded-full"
                />
                <p className="text-center">
                  Por el momento no tienes ningún producto en el carrito. Agrega
                  productos para visualizarlos.
                </p>
              </div>
            </SheetDescription>
          )}
        </SheetHeader>
        {productsInCart && productsInCart?.length! > 0 && (
          <>
            <div className="h-5/6 space-y-2 overflow-scroll py-2">
              {productsInCart?.map((productInCart) => (
                <CartItem
                  key={productInCart.productId}
                  categories={productInCart.product?.categories as string[]}
                  cloudinaryImageId={
                    productInCart.product?.cloudinaryImageId ?? ""
                  }
                  description={productInCart.product?.description ?? ""}
                  price={productInCart.product?.price ?? 0}
                  id={productInCart.productId as number}
                />
              ))}
            </div>
            <footer className="mt-auto space-y-2 antialiased">
              <div className="flex justify-between text-muted-foreground antialiased">
                <span>Total</span>
                <strong>
                  {formatPrice(
                    productsInCart.reduce(
                      (acc, { product }) => acc + (product?.price ?? 0),
                      0,
                    ),
                  )}
                </strong>
              </div>
              <CheckoutButton productsToCarts={productsInCart} />
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
