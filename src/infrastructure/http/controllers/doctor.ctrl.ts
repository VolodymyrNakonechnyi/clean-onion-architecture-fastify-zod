import { FastifyReply, FastifyRequest } from "fastify";
import { doctorService } from "../../../core/services/doctor.srv.js";
import { DoctorId, DoctorPayload, DoctorSlots } from "../../../core/entities/doctor.payload.js";
import { IDoctorRepository } from "../../../core/repositories/doctor.repo.js";
import { DoctorMapper } from "../../../core/mappers/doctor.mapper.js";

export const createDoctor = (
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const doctor = await doctorService(doctorRepository)
        .createDoctor(request.body as DoctorPayload);
    
    void reply.status(201).send(doctor);
}

export const getDoctor = (
    doctorRepository: IDoctorRepository
) => async function(request: FastifyRequest, reply: FastifyReply) {
    const doctor = await doctorService(doctorRepository)
        .getDoctor(request.params as DoctorId);
    
    void reply.status(201).send(doctor);
}

export const addSlots = (
    doctorRepository: IDoctorRepository
) => async function (request: FastifyRequest, reply: FastifyReply) {
    const { slots } = request.body as DoctorSlots;

    const doctorNewSlots = DoctorMapper.toDomain(
        await doctorService(doctorRepository)
            .addSlots(request.params as DoctorId, slots)
    );
    
    void reply.status(201).send(doctorNewSlots);
}