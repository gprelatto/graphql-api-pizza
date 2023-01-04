import "reflect-metadata"
import { DataSource } from "typeorm"
require('dotenv').config();

export const AppDataSource = new DataSource({
   type: "postgres",
   host: process.env.DB_HOST,
   port: Number(process.env.DB_PORT),
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   synchronize: Boolean(process.env.DB_SYNCHRONIZE),
   migrationsRun: Boolean(process.env.DB_MIGRATIONS),
   logging: Boolean(process.env.DB_LOGGING),
   entities: ["src/entity/**/*.ts"], 
   migrations: ['./migrations/*'],
})