import { model } from "mongoose";
import { IAppointment } from "../../../core/entities/appointment.js";
import { AppointmentSchema } from "./appointment.schema.js";
import { EntityDocument } from "../../../lib/types/global.js";

export const appointmentDAO = model<IAppointment>('Appointment', AppointmentSchema);
export type AppointmentDAOType = EntityDocument<IAppointment>;
