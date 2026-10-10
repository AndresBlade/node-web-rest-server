import type { Request, Response } from "express";

type Todo = {
    id: number;
    text: string;
    completedAt: Date | null;
}

const todos: Todo[] = [
    {
        id: 1,
        text: 'Buy some bread',
        completedAt: new Date()
    },
    {
        id: 2,
        text: 'Brush teeth',
        completedAt: new Date()
    },
    {
        id: 3,
        text: 'Watch course',
        completedAt: new Date()
    }
];

export class TodoController {
    constructor() { }

    public getTodos(req: Request, res: Response) {
        res.json(todos)
    }

    public getTodoById(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ error: 'Invalid ID' });
            return;
        }

        const todo = todos.find(t => t.id === parseInt(req.params.id));

        if (!todo) {
            res.status(404).json({ error: 'Todo not found' });
            return;
        }
        res.json(todo);
    }

    public createTodo(req: Request, res: Response) {
        const { text } = req.body;

        if (!text) return res.status(400).json({ error: 'Text is required' });

        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: new Date()
        }

        todos.push(newTodo);

        res.json(newTodo);
    }

    public updateTodo(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todo = todos.find(t => t.id === id);

        if (!todo) return res.status(404).json({ error: `Todo with id ${id} not found` })

        const { text, completedAt } = req.body;

        if (!text) return res.status(400).json({ error: `Invalid Text` })
        if (!text) return res.status(400).json({ error: `Invalid completedAt` })

        todo.text = text || todo.text
        todo.completedAt = completedAt === null
            ? null
            : completedAt
                ? new Date(completedAt)
                : todo.completedAt

        res.json(todo);
    }

    public deleteTodo(req: Request<{ id: string }>, res: Response) {
        const id = parseInt(req.params.id);

        if (isNaN(id)) return res.status(400).json({ error: 'Invalid ID' });

        const todoIndex = todos.findIndex(t => t.id === id)

        if (todoIndex === -1) return res.status(404).json({ error: `Todo with id ${id} not found` })

        const deletedTodo = todos.splice(todoIndex, 1)[0];

        res.json(deletedTodo)
    }
}