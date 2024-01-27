import { verify } from "jsonwebtoken";
import { jwtSecretToken } from "../data/secret";
import { Response, NextFunction } from "express";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
	const accessToken: string = req.headers["accesstoken"];

	try {
		const isMatched = verify(accessToken, jwtSecretToken);
		if (isMatched) {
			req.user = isMatched;
		}
		next();
	} catch (error: unknown) {
		return res.status(400).json({
			msg: "unauthorization",
		});
	}
};
