import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getProductById(id: number) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        category: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts(
  isActive: boolean,
  limit?: number,
  offset?: number,
) {
  try {
    return await db.query.products.findMany({
      where: eq(products.active, isActive),
      with: {
        category: true,
      },
      limit,
      offset,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProductsQuantity() {
  try {
    const products = await db.query.products.findMany();
    return products.length;
  } catch (error) {
    console.error(error);
  }
}
