import express, { Router } from "express";
import * as adminController from "../controller/adminController";

const adminRouter: Router = express();

adminRouter.get("/user/all", adminController.GetAllUsers);
adminRouter.get("/group/all", adminController.GetAllGroups);

export default adminRouter;
