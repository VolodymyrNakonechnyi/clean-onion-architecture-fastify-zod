import { z } from "zod";

const healthResponse = z.object({
    anything: z.string()
});

export const healthResponseSchema = {
    tags: ["Health"],
    describe: "Health check.",
    summary: "Health check endpoint.",
    response: {
        200: healthResponse
    }
}

export type HealthType = z.infer<typeof healthResponse>

const helloResponse = z.object({
    hello: z.string()
});

export type HelloType = z.infer<typeof helloResponse>

export const helloResponseSchema = {
    tags: ["Hello"],
    summary: "Hello check endpoint",
    response: {
        200: helloResponse
    },
}