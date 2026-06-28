import 'dotenv/config';
import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import errorHandler from './common/middleware/error.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());


// routes
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

export default app;     