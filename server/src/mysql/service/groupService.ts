import { groupTable } from "../table";
import pool from "../pool";

interface GroupModel {
	groupId: number;
	groupName: string;
	createdAt: Date;
}

export async function createGroup(groupName: string): Promise<GroupModel> {
	try {
		const [res]: any = await pool.query(
			`
      insert into ${groupTable} (groupName)
      values (?);
    `,
			[groupName]
		);

		const group: any = getGroupById(res.insertId as number);
		return group as GroupModel;
	} catch (error: unknown) {
		throw error;
	}
}

export async function getGroupById(
	groupId: number
): Promise<GroupModel | undefined> {
	try {
		const [[group]]: any = await pool.query(
			`
      select * from ${groupTable}
      where groupId = ?;
    `,
			[groupId]
		);
		return group as GroupModel;
	} catch (error: unknown) {
		throw error;
	}
}

export async function getAllGroups(): Promise<GroupModel[]> {
	try {
		const [groups]: any = await pool.query(`
      select * from ${groupTable};
    `);
		return groups as GroupModel[];
	} catch (error: unknown) {
		throw error;
	}
}

export async function getGroupByName(groupName: string) {
	try {
		const [groups]: any = await pool.query(
			`
			select * from ${groupTable}
			where groupName = ?;
		`,
			[groupName]
		);
		return groups as GroupModel[];
	} catch (error: unknown) {
		throw error;
	}
}
