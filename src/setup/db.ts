import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.PG_URL,
});

export async function query<T = any>(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query<T>(text, params);
  const ms = Date.now() - start;
  console.log(`SQL ${ms}ms -> ${text}`);
  return res;
}
