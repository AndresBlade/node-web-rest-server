import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import type { CreateTodoInput } from "../../domain/entity/Todo";
import type { UpdateTodoInput } from "../../domain/dto/todo/update-todo.dto";

type Todo = {
    id: number;
    text: string;
    completedAt: Date | null;
}

export class TodoController {
    constructor() { }

    public async getTodos(req: Request, res: Response) {
        res.json(await db.orm.public.Todo.all());
    }

    public async getTodoById(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const todo = await db.orm.public.Todo.where({ id }).first();

        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json(todo);
    }

    public async createTodo(req: Request<{}, {}, CreateTodoInput>, res: Response) {
        const { text, completedAt } = req.body;

        const todo = await db.orm.public.Todo.create({
            text,
            completedAt: completedAt === undefined
                ? Temporal.Now.instant()
                : completedAt === null
                    ? null
                    : Temporal.Instant.from(completedAt)
        })

        res.json(todo);
    }

    public async updateTodo(req: Request<{ id: string }, {}, UpdateTodoInput>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todo = {
            ...req.body,
            completedAt: typeof req.body.completedAt === "string" ? Temporal.Instant.from(req.body.completedAt) : req.body.completedAt
        }

        const updatedTodo = await db.orm.public.Todo.where({ id }).update(todo);

        if (!updatedTodo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        // todo.text = text || todo.text
        // todo.completedAt =

        res.json(updatedTodo);
    }

    public async deleteTodo(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todo = await db.orm.public.Todo.where({ id }).delete();

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        res.json(todo)
    }
}