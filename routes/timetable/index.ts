import { OpenAPIHono } from "@hono/zod-openapi";
import { year1 } from "./year/1";

export const timeTableRoute = new OpenAPIHono();

timeTableRoute.route("/year/1", year1);
