import type { CreateTodoDTO, UpdateTodoDTO } from "../../domain/entity/dto/todo";
import type { TodoEntity } from "../../domain/entity/Todo";
import { TodoRepository } from "../../domain/repository/todo.repository";
import { TodoDatasource } from '../../domain/datasource/todo.datasource';

export class TodoRepositoryImpl extends TodoRepository {
    constructor(
        private readonly datasource: TodoDatasource
    ) {
        super()
    }

    create(createTodoDto: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    updateById(id: number, updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        return this.datasource.updateById(id, updateTodoDTO);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id)
    }

}