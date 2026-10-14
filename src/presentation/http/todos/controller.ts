import type { Request, Response } from "express";
import type { CreateTodoDTO, UpdateTodoDTO } from "../../../domain/entity/dto/todo";
import type { TodoRepository } from "../../../domain/repository/todo.repository";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../../domain/usecase";

type Todo = {
    id: number;
    text: string;
    completedAt: Date | null;
}

export class TodoController {
    constructor(private readonly todoRepository: TodoRepository) { }

    public async getTodos(req: Request, res: Response) {
        new GetTodos(this.todoRepository)
            .execute()
            .then(res.json)
            .catch(error => res.status(400).json(error));
    }

    public async getTodoById(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        new GetTodo(this.todoRepository)
            .execute(id)
            .then(res.json)
            .catch(error => {
                if (error instanceof Error) {
                    if (error.message === 'Todo not found')
                        res.status(404).json({ error: error.message });
                }
                res.status(400).json(error);
            });
    }

    public async createTodo(req: Request<{}, {}, CreateTodoDTO>, res: Response) {
        new CreateTodo(this.todoRepository)
            .execute(req.body)
            .then(res.json)
            .catch(error => res.status(400).json(error));
    }

    public async updateTodo(req: Request<{ id: string }, {}, UpdateTodoDTO>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        new UpdateTodo(this.todoRepository)
            .execute(id, req.body)
            .then(res.json)
            .catch(error => res.status(400).json(error));
    }

    public async deleteTodo(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        new DeleteTodo(this.todoRepository)
            .execute(id)
            .then(res.json)
            .catch(error => {
                if (error instanceof Error) {
                    if (error.message === 'Todo not found')
                        res.status(404).json({ error: error.message });
                }
                res.status(400).json(error);
            });
    }
}