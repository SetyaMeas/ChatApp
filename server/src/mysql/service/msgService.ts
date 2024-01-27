import { msgTable } from "../table";
import { userTable } from "../table";
import pool from "../pool";

interface MsgModel {
	msgId: number;
	userId: number;
	groupId: number;
	msg: string;
	sentDate: Date;
}

export async function getAllMsg(): Promise<MsgModel[]> {
	try {
		const [msg]: any = await pool.query(`
      select * from ${msgTable};
    `);
		return msg as MsgModel[];
	} catch (error: unknown) {
		throw error;
	}
}

export async function createMsg(userId: number, groupId: number, msg: string) {
	try {
		const [res] = await pool.query(
			`
      insert into ${msgTable} (userId, groupId, msg)
      values (?, ?, ?);
    `,
			[userId, groupId, msg]
		);
		console.log(res);
	} catch (error: unknown) {
		throw error;
	}
}
