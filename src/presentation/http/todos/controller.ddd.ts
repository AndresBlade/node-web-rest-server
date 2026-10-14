import type { Request, Response } from "express";
import type { CreateTodoDTO, UpdateTodoDTO } from "../../../domain/entity/dto/todo";
import type { TodoRepository } from "../../../domain/repository/todo.repository";

type Todo = {
    id: number;
    text: string;
    completedAt: Date | null;
}

export class TodoController {
    constructor(private readonly todoRepository: TodoRepository) { }

    public async getTodos(req: Request, res: Response) {
        const todos = await this.todoRepository.getAll();
        res.json(todos);
    }

    public async getTodoById(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        try {
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Todo not found')
                    res.status(404).json({ error: error.message });
            }
            res.status(400).json(error);
        }
    }

    public async createTodo(req: Request<{}, {}, CreateTodoDTO>, res: Response) {
        const todo = this.todoRepository.create(req.body)
        res.json(todo);
    }

    public async updateTodo(req: Request<{ id: string }, {}, UpdateTodoDTO>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const updatedTodo = this.todoRepository.updateById(id, req.body)

        if (!updatedTodo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        res.json(updatedTodo);
    }

    public async deleteTodo(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todo = await this.todoRepository.deleteById(id);

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        res.json(todo)
    }
}