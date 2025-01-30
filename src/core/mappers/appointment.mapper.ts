import { AppointmentPayload } from "../entities/appointment.payload.js";
import { IAppointment } from "../entities/appointment.js";
import { AppointmentDAOType } from "../../infrastructure/database/appointment/appointment.dao.js";

export class AppointmentMapper {
    static toDomain(raw: AppointmentDAOType): IAppointment {
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

    static toDomainArray(appointments: AppointmentDAOType[]): IAppointment[] {
        const appointmentsDomain = [];

        for (const appointment of appointments) {
            appointmentsDomain.push(
                this.toDomain(appointment)
            );
        }

        return appointmentsDomain;
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