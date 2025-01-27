import { IDoctor } from "../entities/doctor.js";
import { DoctorId, DoctorPayload } from "../entities/doctor.payload.js";

export interface IDoctorRepository {
    createDoctor(doctorPayload: DoctorPayload): Promise<IDoctor>,
    getDoctor(id: DoctorId): Promise<IDoctor | undefined>,
    addSlots(id: DoctorId, stots: Date[]): Promise<IDoctor | undefined | null>, 
}