import express from "express";
import { getAllGames, getGameById } from "../controllers/gameCotroller.js";

const gameRoute = express.Router();

gameRoute.get("/", getAllGames);         // GET /api/games
gameRoute.get("/:id", getGameById);      // GET /api/games/:id

export default gameRoute;
