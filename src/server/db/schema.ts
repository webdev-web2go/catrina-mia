// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  float,
  int,
  mysqlEnum,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `catrina-mia_${name}`);

export const products = createTable("products", {
  id: int("id").primaryKey().autoincrement(),
  categoryId: int("category_id"),
  price: float("price").notNull(),
  imageUrl: varchar("image_url", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
}));

export type Product = InferSelectModel<typeof products>;

export const categories = createTable("categories", {
  id: int("id").primaryKey().autoincrement(),
  name: mysqlEnum("name", [
    "Bodas",
    "Día de muertos",
    "Navidad",
    "Fantasía",
    "Teatro",
    "Pasarela",
    "Evento social",
    "Bebés",
  ]).notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export type Category = InferSelectModel<typeof categories>;
