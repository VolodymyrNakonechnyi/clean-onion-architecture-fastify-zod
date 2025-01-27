import { UUID } from "crypto";

export interface IDoctor {
    id: UUID,
    phone: string,
    firstname: string,
    lastname: string,
    spec: string,
    slots: Date[]
}