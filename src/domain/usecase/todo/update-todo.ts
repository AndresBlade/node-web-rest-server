import type { UpdateTodoDTO } from "../../entity/dto/todo";
import type { TodoEntity } from "../../entity/Todo";
import type { TodoRepository } from "../../repository/todo.repository";

export interface UpdateTodoUsecase {
    execute(id: number, dto: UpdateTodoDTO): Promise<TodoEntity>;
}

export class UpdateTodo implements UpdateTodoUsecase {

    constructor(
        private readonly todoRepository: TodoRepository
    ) { }

    execute(id: number, dto: UpdateTodoDTO): Promise<TodoEntity> {
        return this.todoRepository.updateById(id, dto);
    }
}