import { OpenAPIHono } from "@hono/zod-openapi";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { routes } from "./routes/_routes";

export const app = new OpenAPIHono();

app.use(prettyJSON({ force: true }));

for (const [path, route] of Object.entries(routes)) {
    app.route(path, route as Hono);
}

app.doc("/openapi", {
    openapi: "3.1.0",
    info: {
        title: "OpenSourceNITJ API",
        version: "1.0.0",
        description: "By developers, for developers.",
    },
    servers: [
        {
            url: "https://api.opensourcenitj.com/",
            description: "Production server",
        },
    ],
});
