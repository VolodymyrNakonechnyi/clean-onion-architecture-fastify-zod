import EventEmitter from "node:events";
import { IAppointmentRepository } from "../repositories/appointment.repo.js";
import { UUID } from "node:crypto";
import cron from "node-cron";
import { IUserRepository } from "../repositories/user.repo.js";
import { IDoctorRepository } from "../repositories/doctor.repo.js";
import { IUser } from "../entities/user.js";
import { IDoctor } from "../entities/doctor.js";

type ReminderCallback = (reminder: {
    user: IUser | undefined,
    doctor: IDoctor | undefined,
    time: Date,
    appointmentDate: Date,
    timeBeforeAppointment: Date
}) => void;

export interface Reminder {
    time: number;
    callback: ReminderCallback;
}

export class NotificationService {
    private scheduledReminders: Map<UUID, Date>;
    private appointmentRepository: IAppointmentRepository;
    private userRepository: IUserRepository;
    private doctorRepository: IDoctorRepository;
    private reminders: Reminder[] = [];

    constructor(
        appointmentRepository: IAppointmentRepository, 
        userRepository: IUserRepository,
        doctorRepository: IDoctorRepository
    ) {
        this.scheduledReminders = new Map();
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;

        this.initializeCronJob();
    }

    addReminders(reminders: Reminder[]) {
        this.reminders = [
            ...this.reminders,
            ...reminders
        ]
    }

    // Put all appointments in Queue
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
        return this.reminders.map(({ time }) => {
            return new Date(appointmentDate.getTime() - time);
        });
    }

    private getTimeBeforeAppointment(reminderTime: Date, appointmentTime: Date): Date {
        const timeDiff = appointmentTime.getTime() - reminderTime.getTime();
        return new Date(timeDiff);
    }

    public async checkAndTriggerReminders() {
        const now = new Date();
        const relevantAppointments = await this.appointmentRepository.getRelevantAppointments();

        for (const appointment of relevantAppointments) {
            const reminderTimes = this.calculateReminderTimes(appointment.slot);
            
            for (const reminderTime of reminderTimes) {
                if (this.isWithinOneMinute(now, reminderTime)) {
                    const user = await this.userRepository.getUser(appointment.userId);
                    const doctor = await this.doctorRepository.getDoctor(appointment.doctorId);

                    const reminderData = {
                        user: user,
                        doctor: doctor,
                        time: now,
                        appointmentDate: appointment.slot,
                        timeBeforeAppointment: this.getTimeBeforeAppointment(reminderTime, appointment.slot)
                    };
                    
                    // Notify all registered callbacks
                    this.reminders.forEach(({ callback }) => callback(reminderData));
                }
            }
        }
    }
}