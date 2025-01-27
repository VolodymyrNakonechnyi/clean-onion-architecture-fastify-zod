import { FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../../repositories/user.repo.js";
import { userService } from "../../../core/services/user.srv.js";
import { UserId, UserPayload } from '../../../core/entities/user.payload.js';

export const createUser = (
    userRepository: UserRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const user = await userService(userRepository)
        .createUser(request.body as UserPayload);
    
    void reply.status(201).send(user);
}

export const getUser = (
    userRepository: UserRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const user = await userService(userRepository)
        .getUser(request.params as UserId);
    
    void reply.status(201).send(user);
}