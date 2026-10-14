import { z } from 'zod';
import type { CreateTodoDTO, UpdateTodoDTO } from '../../../domain/entity/dto/todo'

export const createTodoSchema = z.toZod<CreateTodoDTO>()(z.object({
    text: z.string().trim().min(1),
    completedAt: z.iso.datetime({ error: 'Debe ser fecha ISO válida' }).nullable().optional(),
}))

export const updateTodoSchema = z.toZod<UpdateTodoDTO>()(
    z.object({
        text: z.string().trim().optional(),
        completedAt: z.iso.datetime({ error: 'Debe ser fecha ISO válida' }).nullable().optional(),
    }).refine((d) => d.text !== undefined || d.completedAt !== undefined, {
        error: 'Debes enviar "text" o "completedAt"',
    }))