import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const batch2025Table = sqliteTable("batch2025", {
    rollnumber: integer("rollnumber").primaryKey(),
    name: text("name"),
    branchabbr: text("branchabbr"),
    branch: text("branch"),
    group: text("group"),
    subgroup: text("subgroup"),
});
