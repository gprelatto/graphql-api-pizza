import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
   type: "postgres",
   host: "localhost",
   port: 5433,
   username: 'db_user',
   password: 'db_password',
   database: "pizza_db",
   synchronize: false,
   migrationsRun: true,
   logging: true,
   entities: ["src/entity/**/*.ts"], 
   migrations: ['./migrations/*'],
})
