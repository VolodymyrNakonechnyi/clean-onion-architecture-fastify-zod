import { FastifyRequest, FastifyReply } from "fastify";
import { IAppointmentRepository } from "../../../core/repositories/appointment.repo.js";
import { IDoctorRepository } from "../../../core/repositories/doctor.repo.js";
import { appointmentService } from "../../../core/services/appointment.srv.js";
import { AppointmentId, AppointmentPayload, AppointmentSlot } from "../../../core/entities/appointment.payload.js";


export const createAppointment = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const appointment = await appointmentService(appointmentRepository, doctorRepository)
        .createAppointment(request.body as AppointmentPayload);
    
    void reply.status(201).send(appointment);
}

export const getAppointment = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const appointment = await appointmentService(appointmentRepository, doctorRepository)
        .getAppointment(request.params as AppointmentId);
    
    void reply.status(200).send(appointment);
}

export const cancelAppointment = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const appointment = await appointmentService(appointmentRepository, doctorRepository)
        .cancelAppointment(request.params as AppointmentId);
    
    void reply.status(200).send(appointment);
}

export const completeAppointment = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const appointment = await appointmentService(appointmentRepository, doctorRepository)
        .completedAppointment(request.params as AppointmentId);
    
    void reply.status(200).send(appointment);
}

export const rescheduleAppointment = (
    appointmentRepository: IAppointmentRepository,
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const { slot } = request.body as AppointmentSlot;

    const appointment = await appointmentService(appointmentRepository, doctorRepository)
        .rescheduledAppointment(request.params as AppointmentId, slot);
    
    void reply.status(200).send(appointment);
}