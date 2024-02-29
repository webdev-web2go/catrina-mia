"use server";

import { getProducts, getProductsQuantity } from "@/lib/drizzle/product";

export async function getProductsAction(
  isActive: boolean,
  limit?: number,
  offset?: number,
) {
  return await getProducts(isActive, limit, offset);
}

export async function getProductsQuantityAction() {
  return await getProductsQuantity();
}
