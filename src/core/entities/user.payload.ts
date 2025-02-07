import { type IUser } from "./user.js";

export type UserPayload = Omit<IUser, "id">;
