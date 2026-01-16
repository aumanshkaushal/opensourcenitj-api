import { OpenAPIHono, z } from "@hono/zod-openapi";

export const healthRoute = new OpenAPIHono();

const responseSchema = z.object({
    status: z.string(),
    uptime: z.number(),
    timestamp: z.iso.datetime(),
});

healthRoute.openapi(
    {
        method: "get",
        path: "/",
        tags: ["Health"],
        summary: "Health Check Endpoint",
        description: "Returns the health status of the API server.",
        responses: {
            200: {
                description: "API is healthy",
                content: {
                    "application/json": {
                        schema: responseSchema,
                    },
                },
            },
        },
    },
    c => {
        return c.json({
            status: "ok",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        });
    }
);
