import { UUID } from "crypto";

export interface IUser {
    id: UUID,
    phone: string,
    firstname: string,
    lastname: string
}