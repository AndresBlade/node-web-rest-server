import type { TodoEntity } from "../../entity/Todo";
import type { TodoRepository } from "../../repository/todo.repository";

export interface DeleteTodoUsecase {
    execute(id: number): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUsecase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    execute(id: number): Promise<TodoEntity> {
        return this.todoRepository.deleteById(id);
    }
}