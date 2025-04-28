import express from 'express'
import { addGameKey, checkKeyGame, getAll } from "../controllers/keyGameController.js";

const keyGameRouter = express.Router();

keyGameRouter.get("/", getAll);
keyGameRouter.post("/add-game-key", addGameKey);
keyGameRouter.get("/check-game", checkKeyGame);
keyGameRouter.get("/ping", (req, res) => {
    res.send("pong");
  });

export default keyGameRouter;