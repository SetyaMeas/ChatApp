import pool from "../pool";
import { groupTable, userTable } from "../table";

export interface UserModel {
	userId: number;
	username: string;
	email: string;
	pwd: string;
}

export async function getAllUsers(): Promise<UserModel[]> {
	try {
		const [users]: any = await pool.query(`
		select * from ${userTable}
		`);
		return users as UserModel[];
	} catch (error: unknown) {
		throw error;
	}
}

export async function getUserById(
	userId: number
): Promise<UserModel | undefined> {
	try {
		const [[user]]: any = await pool.query(
			`
      select * from ${userTable}
      where userId = ?;
      `,
			[userId]
		);
		return user as UserModel;
	} catch (error: unknown) {
		throw error;
	}
}

export async function getUserByEmail(email: string) {
	try {
		const [[user]]: any = await pool.query(
			`
			select * from ${userTable}
			where email = ?;
		`,
			[email]
		);
		return user as UserModel;
	} catch (error: unknown) {
		throw error;
	}
}