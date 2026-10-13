
import { z } from 'zod'

export const createTodoSchema = z.object({
    text: z.string(),
    completedAt: z.optional(z.nullable(z.iso.datetime()))
});