import { Router } from "express";
import { TodoController } from "./controller.ts";
import { validateBody } from "../../middleware/validateBody.ts";
import { createTodoSchema, updateTodoSchema } from './todo.schemas.ts'
import { TodoDatasourceImpl } from "../../../infrastructure/datasource/todo.datasource.impl.ts";
import { TodoRepositoryImpl } from "../../../infrastructure/repository/todo.repository.impl.ts";

export class TodoRoutes {
    static get routes(): Router {
        const router = Router();

        const todoDatasource = new TodoDatasourceImpl();
        const todoRepository = new TodoRepositoryImpl(todoDatasource);

        const todoController = new TodoController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);
        router.post('/', validateBody(createTodoSchema), todoController.createTodo);
        router.patch('/:id', validateBody(updateTodoSchema), todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}