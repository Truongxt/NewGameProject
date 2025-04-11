import express from "express";
import { getAuthCode, resetAuthCode, sendCode } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/verify-payment", sendCode);
userRoute.patch("/reset-authCode", resetAuthCode);
userRoute.get("/get-authCode", getAuthCode);

export default userRoute;
