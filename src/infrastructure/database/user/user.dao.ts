import { UserSchema } from "./user.schema.js";
import { IUser } from "../../../core/entities/user.js";
import { model } from "mongoose";

export const userDAO = model<IUser>("User", UserSchema);