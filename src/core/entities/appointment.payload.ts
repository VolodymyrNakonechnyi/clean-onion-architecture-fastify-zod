import { type IAppointment } from "./appointment.js";

export type AppointmentPayload = Omit<IAppointment, "id" | "status" | "createdAt" | "updatedAt">;
export type AppointmentId = Pick<IAppointment, "id">;
export type AppointmentSlot = Pick<IAppointment, "slot">;