import type { CreateTodoDTO } from "../../entity/dto/todo";
import type { TodoEntity } from "../../entity/Todo";
import type { TodoRepository } from "../../repository/todo.repository";

export interface CreateTodoUsecase {
    execute(dto: CreateTodoDTO): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUsecase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.todoRepository.create(dto);
    }
}