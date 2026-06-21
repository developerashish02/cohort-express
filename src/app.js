import 'dotenv/config';
import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import errorHandler from './common/middleware/error.middleware.js';

const app = express();
app.use(express.json());

// routes
app.use("/api/v1/auth",authRouter) ; 
app.use(errorHandler);

export default app; 