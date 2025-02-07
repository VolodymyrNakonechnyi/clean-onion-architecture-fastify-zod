import { UUID } from "node:crypto"
import { IUser } from "../entities/user.js"
import { UserPayload } from "../entities/user.payload.js"

export interface IUserRepository {
    createUser(userPayload: UserPayload): Promise<IUser>,
    getUser(id: UUID): Promise<IUser | undefined>
}