import { IAppointment } from "../entities/appointment.js";
import { AppointmentId, AppointmentPayload } from "../entities/appointment.payload.js";
import { IAppointmentRepository } from "../repositories/appointment.repo.js";
import { IDoctorRepository } from "../repositories/doctor.repo.js";

export interface IAppointmentService {
    createAppointment(appointmentPayload: AppointmentPayload): Promise<IAppointment>,
    getAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    cancelAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    completedAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    rescheduledAppointment(id: AppointmentId, slot: Date): Promise<IAppointment | undefined | null>,
}

export const appointmentService = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
): IAppointmentService => ({
    createAppointment: async (
        appointmentPayload: AppointmentPayload
    ): Promise<IAppointment> => {
        return await appointmentRepository.createAppointment(appointmentPayload);
    },
    getAppointment: async (
        id: AppointmentId
    ): Promise<IAppointment | null | undefined> => {
        return await appointmentRepository.getAppointment(id);
    },

    cancelAppointment: async (
        id: AppointmentId
    ): Promise<IAppointment | undefined | null> => {
        return await appointmentRepository.cancelAppointment(id);
    },

    completedAppointment: async (
        id: AppointmentId
    ): Promise<IAppointment | undefined | null> => {
        return await appointmentRepository.completedAppointment(id);
    },

    rescheduledAppointment: async (
        id: AppointmentId,
        slot: Date
    ): Promise<IAppointment | undefined | null> => {
        return await appointmentRepository.rescheduledAppointment(id, slot);
    }
});