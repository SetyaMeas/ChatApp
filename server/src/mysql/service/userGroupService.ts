import pool from "../pool";
import { userGroupTable, userTable } from "../table";

interface UserGroupModel {
	groupId: number;
	userId: number;
}

export async function userExistedInGroup(
	userId: number,
	groupId: number
): Promise<boolean> {
	try {
		const [[existedUser]]: any = await pool.query(
			`
      select * from ${userGroupTable}
      where userId = ? and groupId = ?;
    `,
			[userId, groupId]
		);

		if (existedUser) {
			return true;
		}
		return false;
	} catch (error: unknown) {
		throw error;
	}
}

export async function userJoinGroup(
	userId: number,
	groupId: number
): Promise<boolean> {
	try {
		const existedUser = await userExistedInGroup(userId, groupId);
		if (existedUser) {
			return false;
		}

		await pool.query(
			`
			insert into ${userGroupTable} (userId, groupId)
			values (?, ?);
		`,
			[userId, groupId]
		);
		return true;
	} catch (error: unknown) {
		throw error;
	}
}

export async function userLeaveGroup(userId: number, groupId: number) {
	try {
		const [deleteUser]: any = await pool.query(
			`
			delete from ${userGroupTable}
			where userId = ? and groupId = ?;
		`,
			[userId, groupId]
		);

		if (deleteUser.affectedRows === 1) {
			return true;
		}
		return false;
	} catch (error: unknown) {
		throw error;
	}
}

interface UserByGroup {
	userId: number;
	username: string;
}
export async function getAllUserByGroupId(
	groupId: number
): Promise<UserByGroup[]> {
	try {
		const [users]: any = await pool.query(
			`
			select ug.userId, u.username from ${userGroupTable} as ug
			inner join ${userTable} as u on u.userId = ug.userId
			where groupId = ?;
		`,
			[groupId]
		);
		return users as UserByGroup[];
	} catch (error) {
		throw error;
	}
}

export async function findAllUserGroup(): Promise<UserGroupModel[]> {
	try {
		const [userGroup]: any = await pool.query(`
			select * from ${userGroupTable};
		`);
		return userGroup as UserGroupModel[];
	} catch (error: unknown) {
		throw error;
	}
}
