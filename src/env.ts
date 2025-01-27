import { z } from 'zod';
import process from 'node:process';
import 'dotenv/config';

const envSchema = z.object({
    PORT: z.coerce.number().int().positive().default(3000),
    URL_MONGO: z.string().url(),
});

const env = envSchema.parse(process.env);

export { env };