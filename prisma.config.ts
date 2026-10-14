/// <reference types="node" />
import 'dotenv/config';
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

const connection = process.env['DATABASE_URL'] ?? process.env['POSTGRES_DB'];

if (!connection) {
  throw new Error(
    'Falta la cadena de conexión a Postgres. Define DATABASE_URL (o POSTGRES_DB) en las variables de entorno.'
  );
}

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection,
    },
  }),
});
