import type { TodoEntity } from "../../entity/Todo";
import type { TodoRepository } from "../../repository/todo.repository";

export interface GetTodoUsecase {
    execute(id: number): Promise<TodoEntity>;
}

export class GetTodo implements GetTodoUsecase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    execute(id: number): Promise<TodoEntity> {
        return this.todoRepository.findById(id);
    }
}