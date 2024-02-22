import { db } from "@/server/db";
import {
  type User,
  products,
  users,
  productsToCarts,
  categories,
} from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";

export async function getProducts(isActive: boolean) {
  try {
    return await db.query.products.findMany({
      where: eq(products.active, isActive),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getCartId() {
  const { userId } = auth();

  try {
    const { cartId } = (await db.query.users.findFirst({
      where: eq(users.clerkId, userId as string),
    })) as User;

    return cartId;
  } catch (error) {
    console.error(error);
  }
}

export async function getProductById(id: number) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsInCart() {
  const cartId = await getCartId();
  try {
    return await db.query.productsToCarts.findMany({
      where: eq(productsToCarts.cartId, cartId as number),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getCategoryById(id: number) {
  try {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  } catch (error) {
    console.error(error);
  }
}
