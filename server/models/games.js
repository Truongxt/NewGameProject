import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  short_description: { type: String, required: true },
  game_url: { type: String, required: true },
  genre: { type: String },
  platform: { type: String },
  publisher: { type: String },
  developer: { type: String },
  release_date: { type: Date }, 
  freetogame_profile_url: { type: String },
  price: { type: Number, default: 0 },
});

const Game = mongoose.model("Game", GameSchema);

export default Game;
