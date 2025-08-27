import { Router } from "express";
import { registration , getLogin } from "../Controllers/auth.controller.js";
const authRouter = Router();

authRouter.get("/register" , registration );
authRouter.get("/login" , getLogin );

export default authRouter;