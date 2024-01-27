import express, { Router } from "express";
import * as authController from "../controller/authController";
import { verifyToken } from "../middleware/verifyToken";

const authRouter: Router = express();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);

export default authRouter;
