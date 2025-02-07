import { UUID } from "crypto";

export const AppointmentStatus = {
    SCHEDULED: 'scheduled',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    RESCHEDULED: 'rescheduled'
} as const;

export type AppointmentStatusType = typeof AppointmentStatus[keyof typeof AppointmentStatus];

export interface IAppointment {
    id: UUID;
    userId: UUID;
    doctorId: UUID;
    slot: Date;
    status: AppointmentStatusType;
    createdAt: Date;
    updatedAt: Date;
};


