import { type IUser } from "./user.js";

export type UserPayload = Omit<IUser, "id">;
export type UserId = Pick<IUser, "id">;