import { UUID } from "node:crypto";
import { IDoctor } from "../entities/doctor.js";
import { DoctorPayload } from "../entities/doctor.payload.js";

export interface IDoctorRepository {
    createDoctor(doctorPayload: DoctorPayload): Promise<IDoctor>,
    getDoctor(id: UUID): Promise<IDoctor | undefined>,
    addSlots(id: UUID, stots: Date[]): Promise<IDoctor | undefined | null>, 
}