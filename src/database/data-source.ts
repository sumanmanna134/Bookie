import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Author } from "../entities/Author";
import { Book } from "../entities/Book";
dotenv.config();
export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: ["query"],
  synchronize: false,
  entities: [Author, Book],
  subscribers: [],
  migrations: ["src/database/migrations/*.ts"],
});
