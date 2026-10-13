# Dev

1. Clonar .env.template y crear el .env
2. Ejecutar el comando docker compose up -d para conectar la base de datos
3. Ejecutar npx prisma contract emit para generar el tipado
4. Ejecutar npx prisma db init para insertar la db generada por prisma en postgres, asegurarse de que la DB en cuestión existe en la url de POSTGRES_URL
