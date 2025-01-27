import { type RouteOptions } from 'fastify'
import { getUserSchema, postUserSchema } from '../schemas/user.schema.js'
import { IUserRepository } from '../../../core/repositories/user.repo.js'
import { createUser, getUser } from '../controllers/user.ctrl.js'

export const userRoutes = (userRepository: IUserRepository): RouteOptions[] => ([
  {
    method: 'POST',
    url: '/users',
    schema: postUserSchema,
    handler: createUser(userRepository)
  },
  {
    method: 'GET',
    url: '/users/:id',
    schema: getUserSchema,
    handler: getUser(userRepository)
  }
]);