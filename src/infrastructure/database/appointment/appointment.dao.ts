import { model } from "mongoose";
import { IAppointment } from "../../../core/entities/appointment.js";
import { AppointmentSchema } from "./appointment.schema.js";

export const appointmentDAO = model<IAppointment>('Appointment', AppointmentSchema);