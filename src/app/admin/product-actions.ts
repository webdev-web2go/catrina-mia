"use server";

import { db } from "@/server/db";
import { products, type Product } from "@/server/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createProductAction({
  categories,
  price,
  description,
  cloudinaryImageId,
}: Pick<
  Product,
  "categories" | "price" | "description" | "cloudinaryImageId"
>) {
  const { userId, orgRole } = auth();

  if (userId && orgRole !== "org:admin") {
    return {
      error: "Sólo los administradores pueden crear productos.",
    };
  }

  if (!categories || !price || !description || !cloudinaryImageId) {
    return {
      error: "Todos los campos son requeridos.",
    };
  }
  try {
    await db
      .insert(products)
      .values({ categories, price, description, cloudinaryImageId });

    revalidatePath("/admin");
    return {
      success: "El producto se agregó correctamente.",
    };
  } catch (err) {
    return {
      error: "Ocurrió un error al crear el producto, intente nuevamente.",
    };
  }
}

export async function changeProductStatusAction(id: number, active: boolean) {
  const { userId, orgRole } = auth();

  if (userId && orgRole !== "org:admin") {
    return {
      error: "Sólo los administradores pueden editar productos.",
    };
  }

  try {
    await db.update(products).set({ active }).where(eq(products.id, id));
    revalidatePath("/admin");
    return {
      success: "Producto actualizado correctamente.",
    };
  } catch (err) {
    return {
      error: "Ocurrió un error al actualizar el producto, intente nuevamente.",
    };
  }
}
