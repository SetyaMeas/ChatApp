import { host, db, user, password } from "../data/secret";
import { Pool, createPool } from "mysql2/promise";

const pool: Pool = createPool({
	host: host,
	user: user,
	database: db,
	password: password,
});

export default pool;
