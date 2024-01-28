import express, { Application } from "express";
import cors, { CorsOptions } from "cors";

import adminRouter from "./routes/adminRouter";
import authRouter from "./routes/authRouter";
import groupRouter from "./routes/groupRouter";

const app: Application = express();
const port: number = 5000;
const corsOpt: CorsOptions = {
	origin: "http://localhost:5173",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOpt));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/auth", authRouter);
app.use("/admin", adminRouter);
app.use("/group", groupRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
