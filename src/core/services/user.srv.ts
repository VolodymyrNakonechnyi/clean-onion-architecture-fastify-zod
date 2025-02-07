import { UUID } from "node:crypto";
import { IUser } from "../entities/user.js";
import { UserPayload } from "../entities/user.payload.js";
import { IUserRepository } from "../repositories/user.repo.js";

interface IUserService {
    createUser(userPayload: UserPayload): Promise<IUser>,
    getUser(id: UUID): Promise<IUser | undefined>
};

export const userService = (
    userRepository: IUserRepository
): IUserService => ({
    createUser: async (userPayload: UserPayload): Promise<IUser> => {
        return await userRepository.createUser(userPayload);
    },

    getUser: async (id: UUID): Promise<IUser | undefined> => {
        return await userRepository.getUser(id);
    }
});