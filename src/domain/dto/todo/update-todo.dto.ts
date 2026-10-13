import { z } from 'zod';

export const updateTodoSchema = z
  .object({
    text: z
      .string('Text must be a string')
      .trim()
      .optional(),
    completedAt: z
      .nullable(z.iso.datetime('Completed date must be a valid ISO datetime'))
      .optional(),
  })
  .refine(
    (data) => data.text !== undefined || data.completedAt !== undefined,
    {
      message: 'At least one of "text" or "completedAt" must be provided',
      path: [],
    }
  );

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
