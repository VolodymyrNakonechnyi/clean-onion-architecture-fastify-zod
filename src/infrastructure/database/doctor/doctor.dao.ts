import { IDoctor } from "../../../core/entities/doctor.js";
import { model } from "mongoose";
import { DoctorSchema } from "./doctor.schema.js";

export const doctorDAO = model<IDoctor>('Doctor', DoctorSchema);