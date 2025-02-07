import assert from 'node:assert';
import { NotificationService } from '../../src/core/services/notification.srv.js';
import { IAppointmentRepository } from '../../src/core/repositories/appointment.repo.js';
import { IUserRepository } from '../../src/core/repositories/user.repo.js';
import { IDoctorRepository } from '../../src/core/repositories/doctor.repo.js';
import { IUser } from '../../src/core/entities/user.js';
import { IDoctor } from '../../src/core/entities/doctor.js';
import { UUID } from 'node:crypto';
import test, { suite } from 'node:test';

// Mock repositories
class MockAppointmentRepository {
    async getRelevantAppointments() {
        return [
            { id: '1', slot: new Date(Date.now() + 60000), userId: 'user1', doctorId: 'doctor1' }
        ];
    }
}

class MockUserRepository implements IUserRepository {
    async getUser(id: UUID): Promise<IUser> {
        return { 
            id: id, 
            phone: "+38095433333", 
            firstname: "John", 
            lastname: "Smith" 
        };
    }

    async createUser(user: IUser): Promise<IUser> {
        return user;
    }
}

class MockDoctorRepository implements IDoctorRepository {
    async getDoctor(id: UUID): Promise<IDoctor> {
        return { 
            id: id, 
            phone: "38095433343", 
            firstname: "John", 
            lastname: 'Doe',
            spec: "doctor(idk)",
            slots: [new Date()]
         };
    }

    async createDoctor(doctor: IDoctor): Promise<IDoctor> {
        return doctor;
    }

    async addSlots(id: UUID, stots: Date[]): Promise<IDoctor | undefined | null> {
        return;
    }
}

// Tests
suite("Notification service test", () => {
    test("Reminder trigger", async () => {
        const appointmentRepository = new MockAppointmentRepository();
        const userRepository = new MockUserRepository();
        const doctorRepository = new MockDoctorRepository();

        const notificationService = new NotificationService(
            appointmentRepository as IAppointmentRepository, 
            userRepository as IUserRepository,
            doctorRepository as IDoctorRepository
        );

        notificationService.addReminders([
            { time: 30000, callback: (reminder: any) => {
                assert.strictEqual(reminder.user?.id, 'user1');
                assert.strictEqual(reminder.doctor?.id, 'doctor1');
                assert.strictEqual(reminder.time instanceof Date, true);
                assert.strictEqual(reminder.appointmentDate instanceof Date, true);
                assert.strictEqual(reminder.timeBeforeAppointment instanceof Date, true);
            }}
        ]);

        await notificationService.checkAndTriggerReminders();
    });
});