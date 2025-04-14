import express from "express";
import { getAuthCode, getCurrentUser, login, register, resetAuthCode, sendCode, verifyAccount } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.post("/verify-payment", sendCode);
userRoute.patch("/reset-authCode", resetAuthCode);
userRoute.get("/get-authCode", getAuthCode);
userRoute.post("/register", register);
userRoute.get("/verify-account", verifyAccount);
userRoute.get("/login", login)
userRoute.get("/me", getCurrentUser);

export default userRoute;