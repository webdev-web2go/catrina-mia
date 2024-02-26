import { db } from "@/server/db";
import { categories } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function getCategoryById(id: number) {
  try {
    return await db.query.categories.findFirst({
      where: eq(categories.id, id),
    });
  } catch (error) {
    console.error(error);
  }
}
