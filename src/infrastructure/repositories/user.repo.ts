import { UUID } from "node:crypto";
import { IUser } from "../../core/entities/user.js";
import { UserPayload } from "../../core/entities/user.payload.js";
import { IUserRepository } from "../../core/repositories/user.repo.js";
import { userDAO } from "../database/user/user.dao.js";

export class UserRepository implements IUserRepository {
    async createUser(userPayload: UserPayload): Promise<IUser> {
        return await userDAO.create(userPayload);
    }

    async getUser(id: UUID): Promise<IUser | undefined> {
        const user = await userDAO.findOne({ id });

        if(!user) {
            return;
        }

        return user;
    }
}