"use server";

import { getCartId } from "@/lib/drizzle/cart";
import { db } from "@/server/db";
import { productsToCarts } from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productId: number, pathname: string) {
  const { userId } = auth();

  if (!userId) {
    return {
      info: "Inicia sesión para agregar cosas al carrito",
    };
  }

  try {
    //Get user's cart's id
    const cartId = await getCartId();

    //Check if product is in the cart already
    const alreadyInCart = await db.query.productsToCarts.findFirst({
      where: and(
        eq(productsToCarts.cartId, cartId as number),
        eq(productsToCarts.productId, productId),
      ),
    });

    if (alreadyInCart) {
      return {
        info: "El producto ya se encuentra en el carrito",
      };
    }

    //Insert product in cart
    await db.insert(productsToCarts).values({ cartId, productId });
    revalidatePath(pathname);
    return {
      success: "El producto se agregó al carrito correctamente",
    };
  } catch (err) {
    return { error: "Algo salió mal, intente nuevamente" };
  }
}

export async function removeFromCartAction(
  pathname: string,
  productId?: number,
) {
  const cartId = await getCartId();
  try {
    if (productId) {
      await db
        .delete(productsToCarts)
        .where(
          and(
            eq(productsToCarts.productId, productId),
            eq(productsToCarts.cartId, cartId as number),
          ),
        );

      revalidatePath(pathname);
      return { success: "Producto eliminado correctamente" };
    } else {
      await db
        .delete(productsToCarts)
        .where(eq(productsToCarts.cartId, cartId as number));
      revalidatePath(pathname);
      return { success: "Carrito vaciado correctamente" };
    }
  } catch (error) {
    return { error: "Algo salió mal, intente nuevamente" };
  }
}
