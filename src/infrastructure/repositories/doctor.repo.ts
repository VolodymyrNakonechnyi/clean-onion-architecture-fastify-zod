import { IDoctor } from "../../core/entities/doctor.js";
import { DoctorId, DoctorPayload } from "../../core/entities/doctor.payload.js";
import { DoctorMapper } from "../../core/mappers/doctor.mapper.js";
import { IDoctorRepository } from "../../core/repositories/doctor.repo.js";
import { doctorDAO } from "../database/doctor/doctor.dao.js";


export class DoctorRepository implements IDoctorRepository {
    async createDoctor(doctorPayload: DoctorPayload): Promise<IDoctor> {
        return await doctorDAO.create(doctorPayload);
    }

    async getDoctor(id: DoctorId): Promise<IDoctor | undefined> {
        const doctor = await doctorDAO.findOne(id);

        if(!doctor) {
            return;
        }

        return doctor;
    }

    async addSlots(id: DoctorId, slots: Date[]): Promise<IDoctor | undefined | null> {
        const doctor = await doctorDAO.findOne(id);
    
        if (!doctor) {
            return;
        }
    
        const uniqueSlots = [...new Set([...doctor.slots, ...slots])];
    
        return DoctorMapper.toPersistence(
            await doctorDAO.findByIdAndUpdate(doctor._id, {
                slots: uniqueSlots
            }, { new: true })
        );
    }
}