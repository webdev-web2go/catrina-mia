import { db } from "@/server/db";
import { products } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getProductById(id: number) {
  try {
    return await db.query.products.findFirst({
      where: eq(products.id, id),
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts(isActive: boolean, limit?: number) {
  try {
    return await db.query.products.findMany({
      where: eq(products.active, isActive),
      limit,
    });
  } catch (error) {
    console.error(error);
  }
}
