import { RouteOptions } from "fastify";
import { IAppointmentRepository } from "../../../core/repositories/appointment.repo.js";
import { 
    cancelAppointmentSchema, 
    completeAppointmentSchema,
    getAppointmentSchema, 
    postAppointmentSchema,
    rescheduleAppointmentSchema
} from "../schemas/appointment.schema.js";
import { 
    cancelAppointment, 
    completeAppointment,
    createAppointment, 
    getAppointment,
    rescheduleAppointment 
} from "../controllers/appointment.ctrl.js";
import { IDoctorRepository } from "../../../core/repositories/doctor.repo.js";

export const appointmentRoutes = (
    appointmentRepository: IAppointmentRepository, 
    doctorRepository: IDoctorRepository
): RouteOptions[] => ([
    {
        method: 'POST',
        url: '/appointments',
        schema: postAppointmentSchema,
        handler: createAppointment(appointmentRepository, doctorRepository)
    },
    {
        method: 'GET',
        url: '/appointments/:id',
        schema: getAppointmentSchema,
        handler: getAppointment(appointmentRepository, doctorRepository)
    },
    {
        method: 'PATCH',
        url: '/appointments/:id/cancel',
        schema: cancelAppointmentSchema,
        handler: cancelAppointment(appointmentRepository, doctorRepository)
    },
    {
        method: 'PATCH',
        url: '/appointments/:id/complete',
        schema: completeAppointmentSchema,
        handler: completeAppointment(appointmentRepository, doctorRepository)
    },
    {
        method: 'PATCH',
        url: '/appointments/:id/reschedule',
        schema: rescheduleAppointmentSchema,
        handler: rescheduleAppointment(appointmentRepository, doctorRepository)
    }
]);