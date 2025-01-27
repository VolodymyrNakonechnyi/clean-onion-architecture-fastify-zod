import { FastifyInstance } from "fastify";
import fastifyMongodb from "@fastify/mongodb";

export const registerMongoMiddleware = (app: FastifyInstance) => {
    app.register(fastifyMongodb, {
        forceClose: true,
        url: 'mongodb://localhost:27017/Hospital'
    });
}
