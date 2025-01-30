import cron from "node-cron";
import EventEmitter from "node:events";
import { IAppointmentRepository } from "../repositories/appointment.repo.js";

export class NotificationRemider extends EventEmitter {
    private scheduledReminders: Map<any, Date>;
    private appointmentRepository: IAppointmentRepository;

    constructor(appointmentRepository: IAppointmentRepository) {
        super();
        this.scheduledReminders = new Map();
        this.appointmentRepository = appointmentRepository;
        // cron.schedule('*****')
    }

    // Put all reminders in Queue
    async sheduleRemiders() {
        this.appointmentRepository.getRelevantAppointments();
    }
}