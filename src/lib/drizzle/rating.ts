import { db } from "@/server/db";
import { ratings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getProductRatings(productId: number) {
  try {
    return await db.query.ratings.findMany({
      where: eq(ratings.productId, productId),
    });
  } catch (error) {
    console.error(error);
  }
}
