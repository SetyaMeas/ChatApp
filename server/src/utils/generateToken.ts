import { jwtSecretToken } from "../data/secret";
import jwt from "jsonwebtoken";

export const generateToken = (data: object): string => {
	const token: string = jwt.sign(data, jwtSecretToken, {
		expiresIn: "600s",
	});
	return token;
};
