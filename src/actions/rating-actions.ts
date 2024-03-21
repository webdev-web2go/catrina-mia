"use server";

import { db } from "@/server/db";
import { type User, ratings, users } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProductRatingAction(productId: number) {
  const user = await currentUser();

  if (!user) return 0;

  try {
    const { id: userId } = (await db.query.users.findFirst({
      where: eq(users.email, user.emailAddresses[0]?.emailAddress as string),
    })) as User;
    const userRating = await db.query.ratings.findFirst({
      where: and(eq(ratings.productId, productId), eq(ratings.userId, userId)),
    });

    if (userRating) {
      return userRating.value;
    } else return 0;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export async function rateProductAction(productId: number, value: number) {
  const user = await currentUser();

  if (!user) {
    return {
      info: "Inicia sesión para calificar el producto.",
    };
  }

  try {
    const { id: userId } = (await db.query.users.findFirst({
      where: eq(users.email, user.emailAddresses[0]?.emailAddress as string),
    })) as User;

    const userAlreadyRated = await db.query.ratings.findFirst({
      where: and(eq(ratings.productId, productId), eq(ratings.userId, userId)),
    });

    if (userAlreadyRated) {
      await db
        .update(ratings)
        .set({
          value,
        })
        .where(
          and(eq(ratings.productId, productId), eq(ratings.userId, userId)),
        );
    } else {
      await db.insert(ratings).values({
        productId,
        userId,
        value,
      });
    }

    revalidatePath("/tocado/[id]/[categories]", "page");
    return {
      success: value,
    };
  } catch (err) {
    return {
      error: "Algo salió mal, intente nuevamente.",
    };
  }
}
