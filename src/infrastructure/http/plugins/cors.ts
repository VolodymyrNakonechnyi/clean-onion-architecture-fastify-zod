import { FastifyInstance } from "fastify";
import fastifyCors from "@fastify/cors";

export const registerCorsMiddleware = (app: FastifyInstance) => {
    app.register(fastifyCors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization']
    });
}