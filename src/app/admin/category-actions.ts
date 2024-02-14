"use server";

import { db } from "@/server/db";

export async function getCategoriesAction() {
  try {
    return db.query.categories.findMany();
  } catch (error) {
    console.error(error);
  }
}
