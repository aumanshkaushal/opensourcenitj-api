import { OpenAPIHono } from "@hono/zod-openapi";
import { getGroupRoute } from "./getGroup";

export const studentsRoute = new OpenAPIHono();

studentsRoute.route("/getGroup", getGroupRoute);
