import pool from "../pool";
import { userTable } from "../table";
import * as userService from "../service/userService";
import { UserModel } from "../service/userService";

export async function register(username: string, email: string, pwd: string) {
	try {
		const [res]: any = await pool.query(
			`
      insert into ${userTable} (username, email, pwd)
      values (?, ?, ?);
    `,
			[username, email, pwd]
		);

		const userId: number = parseInt(res.insertId);
		const user: any = userService.getUserById(userId);
		return user as UserModel;
	} catch (error: unknown) {
		throw error;
	}
}
