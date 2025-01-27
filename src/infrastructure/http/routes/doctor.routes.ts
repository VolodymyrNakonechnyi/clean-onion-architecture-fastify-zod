import { type RouteOptions } from 'fastify'
import { addSlots, createDoctor, getDoctor } from '../controllers/doctor.ctrl.js';
import { IDoctorRepository } from '../../../core/repositories/doctor.repo.js';
import { getDoctorSchema, postDoctorSchema, postDoctorSlotsSchema } from '../schemas/doctor.schema.js';

export const doctorRoutes = (doctorRepository: IDoctorRepository): RouteOptions[] => ([
  {
    method: 'POST',
    url: '/doctors',
    schema: postDoctorSchema,
    handler: createDoctor(doctorRepository)
  },
  {
    method: 'GET',
    url: '/doctors',
    schema: getDoctorSchema,
    handler: getDoctor(doctorRepository)
  },
  {
    method: 'POST',
    url: '/doctors/:id/slots',
    schema: postDoctorSlotsSchema,
    handler: addSlots(doctorRepository)
  }
]);