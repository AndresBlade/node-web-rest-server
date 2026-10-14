import { TodoDatasource } from '../../domain/datasource/todo.datasource';
import type { CreateTodoDTO, UpdateTodoDTO } from '../../domain/entity/dto/todo';
import { TodoEntity } from '../../domain/entity/Todo';
import { db } from '../../prisma/db'
import type { Models } from '../../prisma/contract'

export class TodoDatasourceImpl extends TodoDatasource {
    private toEntity(row: Models.public_Todo): TodoEntity {
        return new TodoEntity(
            row.id,
            row.text,
            row.completedAt ? new Date(row.completedAt.epochMilliseconds) : null
        )
    }

    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        return this.toEntity(await db.orm.public.Todo.create({
            text: createTodoDTO.text,
            completedAt:
                typeof createTodoDTO.completedAt === "string"
                    ? Temporal.Instant.from(createTodoDTO.completedAt)
                    : null
        }))
    }

    async updateById(id: number, updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        const todo = await db.orm.public.Todo.where({ id }).update({
            text: updateTodoDTO.text,
            completedAt:
                typeof updateTodoDTO.completedAt === "string"
                    ? Temporal.Instant.from(updateTodoDTO.completedAt)
                    : updateTodoDTO.completedAt
        });

        if (!todo) throw new Error('Todo not found');

        return this.toEntity(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        return (await db.orm.public.Todo.all()).map(this.toEntity);
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await db.orm.public.Todo.where({ id }).first();
        if (!todo) throw new Error('Todo not found');
        return this.toEntity(todo)
    }
    async deleteById(id: number): Promise<TodoEntity> {
        const todo = await db.orm.public.Todo.where({ id }).delete();

        if (!todo) throw new Error('Todo not found');

        return this.toEntity(todo);
    }

}