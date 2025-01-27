import { type IDoctor } from "./doctor.js";

export type DoctorPayload = Omit<IDoctor, "id" | "slots">;
export type DoctorSlots = Pick<IDoctor, "slots">;
export type DoctorId = Pick<IDoctor, "id">;