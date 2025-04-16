import express from "express";
import { changePassword, forgotPassword, getAuthCode, getCurrentUser, login, register, resetAuthCode, sendCode, verifyAccount, verifyResetCode } from "../controllers/userController.js";

const userRoute = express.Router();

userRoute.patch("/change-password", changePassword);
userRoute.patch("/verify-reset-code", verifyResetCode);
userRoute.patch("/forget-password", forgotPassword);
userRoute.post("/verify-payment", sendCode);
userRoute.patch("/reset-authCode", resetAuthCode);
userRoute.get("/get-authCode", getAuthCode);
userRoute.post("/register", register);
userRoute.get("/verify-account", verifyAccount);
userRoute.post("/login", login)
userRoute.get("/me", getCurrentUser);

export default userRoute;