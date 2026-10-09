import z from 'zod';

export const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    PUBLIC_PATH: z.string().default('public')
});

export const envs = envSchema.parse(process.env);