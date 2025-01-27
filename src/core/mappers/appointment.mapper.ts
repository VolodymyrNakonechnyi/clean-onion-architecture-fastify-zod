import { AppointmentPayload } from "../entities/appointment.payload.js";
import { IAppointment } from "../entities/appointment.js";

export class AppointmentMapper {
    static toDomain(raw: any): IAppointment {
        return {
            id: raw.id,
            userId: raw.userId,
            doctorId: raw.doctorId,
            slot: new Date(raw.slot),
            status: raw.status,
            createdAt: new Date(raw.createdAt),
            updatedAt: new Date(raw.updatedAt)
        };
    }

    static toDomainPayload(raw: any): AppointmentPayload {
        return {
            userId: raw.userId,
            doctorId: raw.doctorId,
            slot: new Date(raw.slot)
        }
    }

    static toPersistence(domain: IAppointment) {
        return {
            id: domain.id,
            userId: domain.userId,
            doctorId: domain.doctorId,
            slot: domain.slot.toISOString(),
            status: domain.status,
            createdAt: domain.createdAt.toISOString(),
            updatedAt: domain.updatedAt.toISOString()
        };
    }
}