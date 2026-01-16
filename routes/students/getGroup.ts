import { OpenAPIHono, z } from "@hono/zod-openapi";
import { getGroup } from "../../lib/firstYear";

export const getGroupRoute = new OpenAPIHono();

const querySchema = z.object({
    rollNumber: z.string(),
});

const responseSchema = z.object({
    group: z.enum(["A1", "A2", "A3", "A4", "A5", "A6", "B1", "B2", "B3", "B4", "B5", "B6"]),
    subGroup: z.enum(["a", "b", "c"]),
});

getGroupRoute.openapi(
    {
        method: "get",
        path: "/",
        tags: ["Students"],
        summary: "Get Student Group [ FIRST YEAR STUDENTS ONLY ]",
        description: "Returns the group (e.g., B6) of a student based on their roll number.",
        request: {
            query: querySchema,
        },
        responses: {
            200: {
                description: "Student group retrieved successfully",
                content: {
                    "application/json": {
                        schema: responseSchema,
                    },
                },
            },
            404: {
                description: "Group not found for the provided roll number.",
            },
        },
    },
    async c => {
        const { rollNumber } = c.req.valid("query");
        const studentGroup = await getGroup(rollNumber);
        if (studentGroup) {
            return c.json({
                group: studentGroup.group as
                    | "A1"
                    | "A2"
                    | "A3"
                    | "A4"
                    | "A5"
                    | "A6"
                    | "B1"
                    | "B2"
                    | "B3"
                    | "B4"
                    | "B5"
                    | "B6",
                subGroup: studentGroup.subGroup as "a" | "b" | "c",
            });
        }
        return c.json({ message: "Group not found for the provided roll number." }, 404);
    }
);
