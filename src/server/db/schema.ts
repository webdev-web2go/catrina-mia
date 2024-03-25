// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { InferSelectModel, relations, sql } from "drizzle-orm";
import {
  boolean,
  float,
  int,
  json,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => name);

/** Schemas */
export const products = createTable("products", {
  id: int("id").primaryKey().autoincrement(),
  categories: json("categories").$type<string[]>().notNull(),
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

export const ratings = createTable("ratings", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  userId: int("user_id").notNull(),
  value: int("value").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const comments = createTable("comments", {
  id: int("id").primaryKey().autoincrement(),
  productId: int("product_id").notNull(),
  userId: int("user_id").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const users = createTable("users", {
  id: int("id").primaryKey().autoincrement(),
  cartId: int("cart_id"),
  email: varchar("email", { length: 256 }).unique().notNull(),
  firstName: varchar("first_name", { length: 256 }).notNull(),
  lastName: varchar("last_name", { length: 256 }).notNull(),
  profileImage: varchar("profile_image", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const carts = createTable("carts", {
  id: int("id").primaryKey().autoincrement(),
  userId: int("user_id").references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

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

/** Relations */
export const productsRelations = relations(products, ({ many }) => ({
  ratings: many(ratings),
  comments: many(comments),
  productsToCarts: many(productsToCarts),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  product: one(products, {
    fields: [comments.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
}));

export const ratingsRelations = relations(ratings, ({ one }) => ({
  product: one(products, {
    fields: [ratings.productId],
    references: [products.id],
  }),
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  ratings: many(ratings),
  comments: many(comments),
  cart: one(carts, {
    fields: [users.cartId],
    references: [carts.id],
  }),
}));

export const cartsRelations = relations(carts, ({ one, many }) => ({
  productsToCarts: many(productsToCarts),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

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

/** Types */
export type Product = InferSelectModel<typeof products>;
export type Rating = InferSelectModel<typeof ratings>;
export type Comment = InferSelectModel<typeof comments>;
export type User = InferSelectModel<typeof users>;
export type ProductToCart = InferSelectModel<typeof productsToCarts>;
