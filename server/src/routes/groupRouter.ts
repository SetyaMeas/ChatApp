import express, { Router } from "express";
import * as groupController from "../controller/groupController";
import { verifyToken } from "../middleware/verifyToken";

const groupRouter: Router = express.Router();

groupRouter.post("/create", verifyToken, groupController.CreateGroup);
groupRouter.post("/join/:groupId", verifyToken, groupController.JoinGroup);
groupRouter.delete("/leave/:groupId", verifyToken, groupController.LeaveGroup);

export default groupRouter;
