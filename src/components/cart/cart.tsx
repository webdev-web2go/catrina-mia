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
          <SheetTitle>
            Tu carrito de compras ({productsInCart?.length})
          </SheetTitle>
          <SheetDescription>
            {productsInCart?.length === 0 && (
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
            )}
          </SheetDescription>
        </SheetHeader>
        {productsInCart && productsInCart?.length! > 0 && (
          <>
            <div className="h-5/6 space-y-2 overflow-scroll py-2">
              {productsInCart?.map((product) => (
                <CartItem
                  key={product.productId}
                  id={product.productId as number}
                />
              ))}
            </div>
            <footer className="mt-auto antialiased">
              <CheckoutButton productsToCarts={productsInCart} />
            </footer>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
