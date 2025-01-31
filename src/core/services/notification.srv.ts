import EventEmitter from "node:events";
import { IAppointmentRepository } from "../repositories/appointment.repo.js";
import { UUID } from "node:crypto";
import cron from "node-cron";

type ReminderCallback = (reminder: {
    userId: UUID,
    appointmentDate: Date,
    timeBeforeAppointment: Date
}) => void;

export class NotificationReminder extends EventEmitter {
    private scheduledReminders: Map<UUID, Date>;
    private appointmentRepository: IAppointmentRepository;
    private reminderCallbacks: ReminderCallback[] = [];
    private readonly reminderIntervals: number[] = [
        720 * 60 * 60 * 1000, // 1 month
        24 * 60 * 60 * 1000, // 24 hours
        2 * 60 * 60 * 1000,  // 2 hour
        15 * 60 * 1000       // 15 minutes
    ];

    constructor(appointmentRepository: IAppointmentRepository) {
        super();
        this.scheduledReminders = new Map();
        this.appointmentRepository = appointmentRepository;

        this.initializeCronJob();
    }

    // Register callback for reminder notifications (like EventEmmiter)
    onReminder(callback: ReminderCallback) {
        this.reminderCallbacks.push(callback);
    }

    // Put all reminders in Queue
    async sheduleReminders() {
        const relevantAppointments = await this.appointmentRepository.getRelevantAppointments();

        for (const relevantAppointment of relevantAppointments) {
            this.scheduledReminders.set(relevantAppointment.id, relevantAppointment.slot);
        }
    }

    private isWithinOneMinute(date1: Date, date2: Date): boolean {
        const diffInMinutes = Math.abs(date1.getTime() - date2.getTime()) / (1000 * 60);
        return diffInMinutes < 1;
    }

    private initializeCronJob() {
        cron.schedule('* * * * *', async () => {
            await this.checkAndTriggerReminders();
        });
    }

    private calculateReminderTimes(appointmentDate: Date): Date[] {
        return this.reminderIntervals.map(interval => {
            return new Date(appointmentDate.getTime() - interval);
        });
    }

    private getTimeBeforeAppointment(reminderTime: Date, appointmentTime: Date): Date {
        const timeDiff = appointmentTime.getTime() - reminderTime.getTime();
        return new Date(timeDiff);
    }

    private async checkAndTriggerReminders() {
        const now = new Date();
        const relevantAppointments = await this.appointmentRepository.getRelevantAppointments();

        for (const appointment of relevantAppointments) {
            const reminderTimes = this.calculateReminderTimes(appointment.slot);
            
            for (const reminderTime of reminderTimes) {
                if (this.isWithinOneMinute(now, reminderTime)) {
                    this.emit('reminder', {
                        userId: appointment.userId,
                        appointmentDate: appointment.slot,
                        timeBeforeAppointment: this.getTimeBeforeAppointment(reminderTime, appointment.slot)
                    });
                }
            }
        }
    }
}