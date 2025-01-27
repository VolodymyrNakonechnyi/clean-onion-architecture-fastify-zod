import { RouteOptions } from "fastify";
import { userRoutes } from "./user.routes.js";
import { doctorRoutes } from "./doctor.routes.js";
import { commonRoutes } from "./common.routes.js";
import { IUserRepository } from "../../../core/repositories/user.repo.js";
import { IDoctorRepository } from "../../../core/repositories/doctor.repo.js";
import { appointmentRoutes } from "./appointment.routes.js";
import { IAppointmentRepository } from "../../../core/repositories/appointment.repo.js";

export default (
  appointmentRepository: IAppointmentRepository,
  doctorRepository: IDoctorRepository,
  userRepository: IUserRepository
): RouteOptions[] => ([
  ...userRoutes(userRepository),
  ...doctorRoutes(doctorRepository),
  ...appointmentRoutes(appointmentRepository, doctorRepository),
  ...commonRoutes()
]);