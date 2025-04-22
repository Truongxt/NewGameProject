import mongoose from "mongoose";

const gameKeySchema = new mongoose.Schema({
  gameId: { type: String, required: true },
  gameKeys: [{ type: String, required: true }], // Mảng các key game
});

const GameKey = mongoose.model("GameKey", gameKeySchema,"GameKey");
export default GameKey;