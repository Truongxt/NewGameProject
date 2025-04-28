import express from 'express'
import { addGameKey } from "../controllers/keyGameController.js";
const router = express.Router();

router.post("/add-game-key", addGameKey);


export default router;