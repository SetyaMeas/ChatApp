import { Request, Response } from "express";
import { hashSync, compareSync } from "bcryptjs";

import { getUserByEmail } from "../mysql/service/userService";
import { isValidEmail, isValidString } from "../utils/validator";

import { generateToken } from "../utils/generateToken";
import { register } from "../mysql/service/authService";
import { decode } from "jsonwebtoken";

interface RegisterBody {
	username: string;
	email: string;
	pwd: string;
}
export async function Register(req: Request | any, res: Response) {
	const { username, email, pwd } = <RegisterBody>req.body;

	if (!isValidEmail(email) || !isValidString(username) || !isValidString(pwd)) {
		return res.status(400).json({
			msg: "invalid input",
		});
	}

	try {
		const existedEmail = await getUserByEmail(email);
		if (existedEmail) {
			return res.status(400).json({
				msg: "email already existed",
			});
		}

		const user = await register(username, email, hashSync(pwd, 12));
		const token: string = generateToken({
			userId: user.userId,
			email: user.email,
		});
		res.json({
			user: user,
			token,
		});
	} catch (error: unknown) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}

interface LoginBody {
	email: string;
	pwd: string;
}
export async function Login(req: Request, res: Response) {
	const { email, pwd } = <LoginBody>req.body;

	if (isValidEmail(email) === false) {
		return res.status(400).json({
			msg: "invalid input",
		});
	} else if (isValidString(pwd) === false) {
		return res.status(400).json({
			msg: "invalid input",
		});
	}

	try {
		const userTarget = await getUserByEmail(email);
		if (!userTarget) {
			return res.status(400).json({
				msg: "email or password is incorrect",
			});
		}

		const isMatched: boolean = compareSync(pwd, userTarget.pwd);
		if (isMatched) {
			const token: string = generateToken({
				email: userTarget.email,
				userId: userTarget.userId,
			});
			return res.json({
				user: userTarget,
				token,
			});
		}
		res.status(400).json({
			msg: "email or password is incorrect",
		});
	} catch (error: unknown) {
		res.status(502).json({
			msg: "something went wrong",
		});
	}
}
