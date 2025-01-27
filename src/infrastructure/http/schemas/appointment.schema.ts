import { z } from 'zod';
import { type FastifySchema } from 'fastify';

export const AppointmentSchema = z.object({
    id: z.string().uuid().optional(),
    userId: z.string().uuid(),
    doctorId: z.string().uuid(),
    slot: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Invalid date format" }
    ),
    status: z.enum(['scheduled', 'cancelled', 'completed', 'rescheduled']).default('scheduled'),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

export const AppointmentSchemaResponse = AppointmentSchema.omit({slot: true}).extend({slot: z.date()});

export const AppointmentPayloadSchema = AppointmentSchema.pick({
    userId: true,
    doctorId: true,
    slot: true
});

const AppointmentParamsSchema = AppointmentSchema.pick({ id: true });

export type AppointmentParamsSchemaType = z.infer<typeof AppointmentParamsSchema>;

export const postAppointmentSchema: FastifySchema = {
    description: 'Create a new appointment',
    tags: ['Appointments'],
    summary: 'Create new appointment for specific date',
    body: AppointmentPayloadSchema,
    response: {
        201: AppointmentSchemaResponse
    }
};

export const getAppointmentSchema: FastifySchema = {
    description: 'Get existing appointment',
    tags: ['Appointments'],
    summary: 'Get appointment details',
    params: AppointmentParamsSchema,
    response: {
        200: AppointmentSchemaResponse
    }
};

export const cancelAppointmentSchema: FastifySchema = {
    description: 'Cancel appointment',
    tags: ['Appointments'],
    summary: 'Cancel existing appointment',
    params: AppointmentParamsSchema,
    response: {
        200: AppointmentSchemaResponse
    }
};

export const completeAppointmentSchema: FastifySchema = {
    description: 'Complete appointment',
    tags: ['Appointments'],
    summary: 'Mark appointment as completed',
    params: AppointmentParamsSchema,
    response: {
        200: AppointmentSchemaResponse
    }
};

export const rescheduleAppointmentSchema: FastifySchema = {
    description: 'Reschedule appointment',
    tags: ['Appointments'],
    summary: 'Change appointment slot',
    params: AppointmentParamsSchema,
    body: AppointmentSchema.pick({ slot: true }),
    response: {
        200: AppointmentSchemaResponse
    }
};