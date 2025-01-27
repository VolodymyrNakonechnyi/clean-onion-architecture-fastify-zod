import { z } from 'zod';
import { type FastifySchema } from 'fastify';

export const UserSchema = z.object({
  id: z.string().uuid().optional(),
  phone: z.string(),
  firstname: z.string(),
  lastname: z.string()
});

export const UserPayloadSchema = UserSchema.omit({ id: true });

export type UserType = z.infer<typeof UserSchema>;
export type UserPayloadType = z.infer<typeof UserPayloadSchema>;

export const postUserSchema: FastifySchema = {
  description: 'Create a new user',
  tags: ['Users'],
  summary: 'Creates new user with given values',
  body: UserPayloadSchema,
  response: {
    201: UserSchema
  },
};

const UserParamsSchema = z.object({
    id: z.string().uuid()
});

export type TypeUserParams = z.infer<typeof UserParamsSchema>;

export const getUserSchema: FastifySchema = {
    description: 'Get an existing user',
    tags: ['Users'],
    summary: 'Retrieve information about a specific user',
    params: UserParamsSchema,
    response: {
      201: UserSchema
    },
}