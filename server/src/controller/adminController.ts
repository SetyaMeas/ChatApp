import { Request, Response } from "express";
import * as userService from "../mysql/service/userService";
import { getAllGroups } from "../mysql/service/groupService";

export async function GetAllUsers(_req: Request, res: Response) {
	try {
		const users = await userService.getAllUsers();
		res.json({
			users,
		});
	} catch (error: unknown) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}

export async function GetAllGroups(req: Request, res: Response) {
	try {
		const groups = await getAllGroups();
		res.json({
			groups,
		});
	} catch (error) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}
