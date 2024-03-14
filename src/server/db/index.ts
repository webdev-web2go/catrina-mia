import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import { env } from "@/env";
import * as schema from "./schema";

const connection = mysql.createConnection({
  uri: env.MYSQL_URL,
});

export const db = drizzle(connection, { schema, mode: "default" });
