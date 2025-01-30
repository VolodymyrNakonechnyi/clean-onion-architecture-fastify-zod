import { IAppointmentRepository } from "../../core/repositories/appointment.repo.js";
import { AppointmentId, AppointmentPayload } from "../../core/entities/appointment.payload.js";
import { AppointmentStatus, IAppointment } from "../../core/entities/appointment.js";
import { appointmentDAO } from "../database/appointment/appointment.dao.js";
import { doctorDAO } from "../database/doctor/doctor.dao.js";
import { AppointmentMapper } from "../../core/mappers/appointment.mapper.js";

export class AppointmentRepository implements IAppointmentRepository {
    async createAppointment(
        appointmentPayload: AppointmentPayload
    ): Promise<IAppointment> {
        const doctor = await doctorDAO.findOne({ id: appointmentPayload.doctorId });
        const dateSlot = new Date(appointmentPayload.slot);

        if (!doctor || doctor.slots.includes(dateSlot)) {
            throw new Error('Selected slot is not available');
        }

        const appointment = await appointmentDAO.create(appointmentPayload);
        
        await doctorDAO.findOneAndUpdate(
            { id: appointmentPayload.doctorId },
            { $pull: { slots: appointmentPayload.slot } }
        );
            
        return AppointmentMapper.toDomain(appointment);
    }

    async getRelevantAppointments(): Promise<IAppointment[]> {
        const now = Date.now();

        const appointments = await appointmentDAO.find({
            slot: { $gte: now } // all future appointments from current date
        });
        
        return AppointmentMapper.toDomainArray(appointments);
    }

    async getAppointment(id: AppointmentId): Promise<IAppointment | undefined> {
        const appointment = await appointmentDAO.findOne(id);
        
        if(!appointment) {
            return;
        }

        return appointment;
    }

    async cancelAppointment(id: AppointmentId): Promise<IAppointment | undefined | null> {
        const appointment = await appointmentDAO.findOne(id);
        if (!appointment) {
            return;
        }
    
        const updatedAppointment = await appointmentDAO.findOneAndUpdate(
            id,
            { status: AppointmentStatus.CANCELLED },
            { new: true }
        );
    
        if(!updatedAppointment) {
            return;
        }

        await doctorDAO.findOneAndUpdate(
            { id: appointment.doctorId },
            { $addToSet: { slots: appointment.slot } }
        );

    
        return AppointmentMapper.toDomain(updatedAppointment);
    }
    
    async completedAppointment(id: AppointmentId): Promise<IAppointment | undefined | null> {
        const appointment = await appointmentDAO.findOne(id);
        if (!appointment) {
            return;
        }
    
        const updatedAppointment = await appointmentDAO.findOneAndUpdate(
            id,
            { status: AppointmentStatus.COMPLETED },
            { new: true }
        );

        if(!updatedAppointment) {
            return;
        }

        return AppointmentMapper.toDomain(updatedAppointment);
    }
    
    async rescheduledAppointment(
        id: AppointmentId,
        newSlot: Date
    ): Promise<IAppointment | undefined | null> {
        const appointment = await appointmentDAO.findOne(id);
        if (!appointment) {
            return;
        }
    
        const updatedAppointment = await appointmentDAO.findOneAndUpdate(
            id,
            {
                status: AppointmentStatus.RESCHEDULED,
                slot: newSlot
            },
            { new: true }
        );
    
        if(!updatedAppointment) {
            return;
        }

        await doctorDAO.findOneAndUpdate(
            { id: appointment.doctorId },
            { $addToSet: { slots: appointment.slot } }
        );
    
        await doctorDAO.findOneAndUpdate(
            { id: appointment.doctorId },
            { $pull: { slots: newSlot } }
        );
    
        return AppointmentMapper.toDomain(updatedAppointment);
    }
}