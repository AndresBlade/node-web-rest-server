#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/7bc113e7fa3c24ccd25110ad6aee8080876b3ea6bb02b456c76c83719206ff7e/contract';
import startContract from '../../snapshots/7bc113e7fa3c24ccd25110ad6aee8080876b3ea6bb02b456c76c83719206ff7e/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/90b2fd72d7aa599ab4d560c01e8adff881dc0f4b2fe82fe630b6426c66d32cc4/contract';
import endContract from '../../snapshots/90b2fd72d7aa599ab4d560c01e8adff881dc0f4b2fe82fe630b6426c66d32cc4/contract.json' with { type: 'json' };
import { Migration, MigrationCLI } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [this.dropNotNull({ schema: 'public', table: 'Todo', column: 'completedAt' })];
  }
}

MigrationCLI.run(import.meta.url, M);
