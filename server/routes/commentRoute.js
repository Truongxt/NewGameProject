import express from "express";
import { getComment, sendComment } from "../controllers/commetController.js";

const commentRoute = express.Router();

commentRoute.post("/comment", sendComment);
commentRoute.get("/get", getComment);
export default commentRoute;
