import express from "express";
import { getAllGames, getGameByGenre, getGameById, getGameByParams, getGameByTitle, getGameLimit, getGameSortByTitle } from "../controllers/gameCotroller.js";

const gameRoute = express.Router();

gameRoute.get("/search", getGameByParams);
gameRoute.get("/get-game-title-sort", getGameSortByTitle);
gameRoute.get("/get-game-by-genre", getGameByGenre);
gameRoute.get("/get-game-by-title", getGameByTitle);
gameRoute.get("/limit", getGameLimit);
gameRoute.get("/:id", getGameById);     
gameRoute.get("/", getAllGames);         

export default gameRoute;
