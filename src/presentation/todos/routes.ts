import { Router } from "express";
import { TodoController } from "./controller.js";
import { validateBody } from "../../middleware/validateBody.js";
import { createTodoSchema } from "../../domain/dto/todo/create-todo.dto.js";
import { updateTodoSchema } from "../../domain/dto/todo/update-todo.dto.js";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();
        const todoController = new TodoController();

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', validateBody(createTodoSchema), todoController.createTodo);
        router.patch('/:id', validateBody(updateTodoSchema), todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}