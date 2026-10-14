import type { TodoEntity } from "../../entity/Todo";
import type { TodoRepository } from "../../repository/todo.repository";

export interface GetTodosUsecase {
    execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUsecase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    execute(): Promise<TodoEntity[]> {
        return this.todoRepository.getAll();
    }
}