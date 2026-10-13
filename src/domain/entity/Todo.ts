import z from "zod";
import { createTodoSchema } from "../dto/todo/create-todo.dto.ts";

export type CreateTodoInput = z.infer<typeof createTodoSchema>;