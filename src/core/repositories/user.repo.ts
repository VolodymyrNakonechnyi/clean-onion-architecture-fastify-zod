import { IUser } from "../entities/user.js"
import { UserId, UserPayload } from "../entities/user.payload.js"

export interface IUserRepository {
    createUser(userPayload: UserPayload): Promise<IUser>,
    getUser(id: UserId): Promise<IUser | undefined>
}