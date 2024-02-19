"use server";

import { db } from "@/server/db";
import { type User, users, carts, productsToCarts } from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";

export async function addToCartAction(productId: number) {
  const { userId } = auth();

  if (!userId) {
    return {
      info: "Inicia sesión para agregar cosas al carrito",
    };
  }

  try {
    //Check if user has a cart asigned
    const user = (await db.query.users.findFirst({
      where: eq(users.clerkId, userId),
    })) as User;

    const { cartId, id } = user;

    if (!cartId) {
      //Create the cart
      const { insertId } = await db.insert(carts).values({ userId: id });
      //Asign cartId to user
      await db.update(users).set({ cartId: Number(insertId) });
      //Insert product in cart
      await db
        .insert(productsToCarts)
        .values({ cartId: Number(insertId), productId });
    } else {
      //Check if product is not in the cart already
      const alreadyInCart = await db.query.productsToCarts.findFirst({
        where: and(
          eq(productsToCarts.cartId, cartId),
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
    }
    return {
      success: "El producto se agregó al carrito correctamente",
    };
  } catch (err) {
    console.log("hay un error al agregar al carrito --->", err);
    return { error: "Algo salió mal, intente nuevamente" };
  }
}
