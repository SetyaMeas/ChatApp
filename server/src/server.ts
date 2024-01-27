import express, { Application } from "express";

import adminRouter from "./routes/adminRouter";
import authRouter from "./routes/authRouter";
import groupRouter from "./routes/groupRouter";

const app: Application = express();
const port: number = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/group", groupRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
