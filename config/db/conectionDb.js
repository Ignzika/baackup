import pg from "pg";
import { config } from "dotenv";
config();

const pool = new pg.Pool({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.NAME_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
  // allowExitOnIdle: true
  // connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => console.log("DATABASE connected"));

export default pool;
