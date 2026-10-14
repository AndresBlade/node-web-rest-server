import type { CreateTodoDTO, UpdateTodoDTO } from "../entity/dto/todo";
import type { TodoEntity } from "../entity/Todo";

export abstract class TodoDatasource {
    abstract create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity>;
    abstract updateById(id: number, updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity>;
    //todo: pagination
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById(id: number): Promise<TodoEntity>
    abstract deleteById(id: number): Promise<TodoEntity>
}