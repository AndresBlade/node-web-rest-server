#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/7bc113e7fa3c24ccd25110ad6aee8080876b3ea6bb02b456c76c83719206ff7e/contract';
import endContract from '../../snapshots/7bc113e7fa3c24ccd25110ad6aee8080876b3ea6bb02b456c76c83719206ff7e/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, primaryKey } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Todo',
        columns: [
          col('completedAt', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-temporal@1' },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('text', 'character varying', {
            notNull: true,
            codecRef: { codecId: 'sql/varchar@1' },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
