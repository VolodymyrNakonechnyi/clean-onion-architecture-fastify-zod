import { z } from 'zod';
import { type FastifySchema } from 'fastify';

export const DoctorSchema = z.object({
    id: z.string().uuid().optional(),
    phone: z.string().max(30),
    firstname: z.string().max(50),
    lastname: z.string().max(50),
    spec: z.string().max(50),
    slots: z.array(
        z.string().refine(
          (val) => !isNaN(Date.parse(val)), // Перевірка, чи це валідна дата
          { message: "Invalid date format" }
        )
      ).max(238, { message: "Maximum 238 slots allowed per doctor" }).default([]) // Додаємо порожній масив за замовчуванням
    });
    

export const DoctorPayloadSchema = DoctorSchema.omit({ id: true, slots: true });

export const postDoctorSchema: FastifySchema = {
  description: 'Create a new doctor',
  tags: ['Doctors'],
  summary: 'Creates new doctor with given values',
  body: DoctorPayloadSchema,
  response: {
    201: DoctorSchema
  },
};

const DoctorParamsSchema = DoctorSchema.pick({id: true});

export const getDoctorSchema: FastifySchema = {
    description: 'Get existing doctor',
    tags: ['Doctors'],
    summary: 'Receive information about specific doctor',
    params: DoctorParamsSchema,
    response: {
      201: DoctorSchema
    },
}; 

const DoctorSlotsSchema = DoctorSchema.pick({slots: true});

export type DoctorSlotsSchemaType = z.infer<typeof DoctorSlotsSchema>;

export const postDoctorSlotsSchema: FastifySchema = {
    description: 'Create new slots',
    tags: ['Doctors'],
    summary: 'Creates new slots with given dates',
    params: DoctorParamsSchema,
    body: DoctorSlotsSchema,
    response: {
      201: DoctorSchema
    },
}; 
  