import { UUID } from "crypto";
import { IDoctor } from "../entities/doctor.js";
import { DoctorPayload } from "../entities/doctor.payload.js";
import { IDoctorRepository } from "../repositories/doctor.repo.js";

interface IDoctorService {
    createDoctor(doctorPayload: DoctorPayload): Promise<IDoctor>,
    getDoctor(id: UUID): Promise<IDoctor | undefined>,
    addSlots(id: UUID, slots: Date[]): Promise<IDoctor | undefined | null>
}

export const doctorService = (
    doctorRepository: IDoctorRepository
): IDoctorService => ({
    createDoctor: async (doctorPayload: DoctorPayload):Promise<IDoctor> => {
        return await doctorRepository.createDoctor(doctorPayload);
    },
    getDoctor: async (id: UUID): Promise<IDoctor | undefined> => {
        return await doctorRepository.getDoctor(id);
    },
    addSlots: async (id, slots): Promise<IDoctor | undefined | null> => {
        return await doctorRepository.addSlots(id, slots);
    },
})