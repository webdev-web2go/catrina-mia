// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  boolean,
  float,
  int,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
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
  categoryId: int("category_id").notNull(),
  price: float("price").notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  cloudinaryImageId: varchar("cloudinary_image_id", { length: 256 }).notNull(),
  stock: int("stock").default(1),
  active: boolean("active").default(true),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  productsToCarts: many(productsToCarts),
}));

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

export const users = createTable("users", {
  id: int("id").primaryKey().autoincrement(),
  clerkId: varchar("clerk_id", { length: 256 }).notNull(),
  cartId: int("cart_id"),
  email: varchar("email", { length: 256 }).notNull(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  profileImage: varchar("profile_image", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  cart: one(carts, {
    fields: [users.cartId],
    references: [carts.id],
  }),
}));

export const carts = createTable("carts", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id"),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const cartsRelations = relations(carts, ({ one, many }) => ({
  productsToCarts: many(productsToCarts),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export const productsToCarts = createTable(
  "products_to_carts",
  {
    productId: int("product_id"),
    cartId: int("cart_id"),
  },
  ({ cartId, productId }) => ({
    pk: primaryKey({ columns: [cartId, productId] }),
  }),
);

export const productsToCartsRelations = relations(
  productsToCarts,
  ({ one }) => ({
    cart: one(carts, {
      fields: [productsToCarts.cartId],
      references: [carts.id],
    }),
    product: one(products, {
      fields: [productsToCarts.productId],
      references: [products.id],
    }),
  }),
);

export type Product = InferSelectModel<typeof products>;
export type Category = InferSelectModel<typeof categories>;
export type User = InferSelectModel<typeof users>;
