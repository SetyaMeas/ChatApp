import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "..", "..", ".env") });

export const jwtSecretToken: string = process.env.JWT_SECRET_TOKEN as string;

// db
export const host: string = process.env.HOST as string;
export const user: string = process.env.USER as string;
export const db: string = process.env.DB as string;
export const password: string = process.env.PASSWORD as string;
