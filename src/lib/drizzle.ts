import { db } from "@/server/db";
import { products } from "@/server/db/schema";
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
