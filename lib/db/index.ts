import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

const sqlite = new Database("database.sqlite");
const db = drizzle({ client: sqlite });

export { db };
