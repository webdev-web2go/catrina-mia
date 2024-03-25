"use server";

import { getUserByEmail } from "@/lib/drizzle/user";
import { db } from "@/server/db";
import { comments, type Comment, type User } from "@/server/db/schema";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function createCommentAction({
  productId,
  message,
}: Pick<Comment, "productId" | "message">) {
  const user = await currentUser();

  if (!user) {
    return {
      info: "Inicia sesión para calificar el producto.",
    };
  }

  try {
    const { id: userId } = (await getUserByEmail(
      user.emailAddresses[0]?.emailAddress as string,
    )) as User;

    await db.insert(comments).values({
      message,
      productId,
      userId,
    });

    revalidatePath("/tocado/[id]/[categories]", "page");

    return {
      success: "Comentario agregado exitosamente.",
    };
  } catch (err) {
    return {
      error: "Algo salió mal, intente nuevamente.",
    };
  }
}
