import { Request, Response } from "express";
import { createGroup, getGroupById } from "../mysql/service/groupService";
import {
	userJoinGroup,
	userLeaveGroup,
} from "../mysql/service/userGroupService";
import { isValidString } from "../utils/validator";
import { getUserById } from "../mysql/service/userService";

export async function CreateGroup(req: Request | any, res: Response) {
	const groupName: string = req.body.groupName;
	if (!isValidString(groupName)) {
		return res.status(400).json({
			msg: "invalid group name",
		});
	}

	const userId: number = req.user.userId;

	try {
		const newGroup = await createGroup(groupName);
		await userJoinGroup(userId, newGroup.groupId); // user will join group after creating

		res.json({
			group: newGroup,
		});
	} catch (error) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}

export async function JoinGroup(req: Request | any, res: Response) {
	const groupId: number = req.params.groupId;
	const userId: number = req.user.userId;

	try {
		const group = await getGroupById(groupId);
		if (group) {
			const joinGroup = await userJoinGroup(userId, groupId);
			const user = await getUserById(userId);

			if (joinGroup) {
				return res.json({
					user,
					group,
				});
			}
			return res.json({
				user,
				group,
			});
		}

		res.status(400).json({
			msg: "group doesn't exist",
		});
	} catch (error) {
		throw error;
	}
}

export async function LeaveGroup(req: Request | any, res: Response) {
	const groupId: number = req.params.groupId;
	const userId: number = req.user.userId;

	try {
		const leaveGroup = await userLeaveGroup(userId, groupId);
		if (leaveGroup) {
			return res.json({
				msg: "successfull left group",
			});
		}
		res.status(400).json({
			msg: "group or user doesn't exist",
		});
	} catch (error) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}
