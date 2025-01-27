import { FastifyReply, FastifyRequest } from "fastify";

export const healthHandler = async (
    request: FastifyRequest, 
    reply: FastifyReply
):Promise<void>  => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.send({ anything: "d" });
}

export const helloHandler = async (
    request: FastifyRequest, 
    reply: FastifyReply
):Promise<void>  => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.send({ hello: "world" });
}