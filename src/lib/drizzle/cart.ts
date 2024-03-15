import { db } from "@/server/db";
import { type User, users, productsToCarts } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getCartId() {
  const user = await currentUser();

  try {
    const { cartId } = (await db.query.users.findFirst({
      where: eq(users.email, user?.emailAddresses[0]?.emailAddress as string),
    })) as User;

    return cartId;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsInCart() {
  const cartId = await getCartId();
  try {
    return await db.query.productsToCarts.findMany({
      where: eq(productsToCarts.cartId, cartId as number),
      with: {
        product: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
