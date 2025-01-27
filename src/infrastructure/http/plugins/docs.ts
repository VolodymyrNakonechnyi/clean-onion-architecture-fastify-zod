import { FastifyInstance } from "fastify";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { createJsonSchemaTransform } from "fastify-type-provider-zod";

export const swaggerOptions = {
    transform: createJsonSchemaTransform({
        skipList: [
            '/documentation',
            '/documentation/initOAuth',
            '/documentation/json',
            '/documentation/uiConfig',
            '/documentation/yaml',
            '/documentation/*',
            '/documentation/static/*',
            '*',
        ],
    }),
    openapi: {
        info: {
            title: "Hospital Task",
            description: "Hospital Task.",
            version: "1.0.0",
        },
    },
};

export const swaggerUiOptions = {
    routePrefix: "/docs",
    exposeRoute: true,
};

export const registerSwaggerMiddleware = (app: FastifyInstance) => {
    return app
        .register(fastifySwagger, swaggerOptions)
        .register(fastifySwaggerUi, swaggerUiOptions);
}
