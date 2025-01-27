import { IAppointment } from "../entities/appointment.js";
import { AppointmentId, AppointmentPayload } from "../entities/appointment.payload.js";

export interface IAppointmentRepository {
    createAppointment(appointmentPayload: AppointmentPayload): Promise<IAppointment>,
    getAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    cancelAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    completedAppointment(id: AppointmentId): Promise<IAppointment | undefined | null>,
    rescheduledAppointment(id: AppointmentId, newSlot: Date): Promise<IAppointment | undefined | null>,
}