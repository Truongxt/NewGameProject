import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentId: { type: String, required: true, unique: true },
  gameId: { type: String, required: true},
  content: {type:String, required: true},
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  commentDate: { type: Date, default: Date.now },
  responseFor: { type: String }
});

const GameComment = mongoose.model("GameComment", CommentSchema);

export default GameComment;
