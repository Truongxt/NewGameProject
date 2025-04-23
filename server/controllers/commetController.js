import GameComment from "../models/gameComment.js";
import User from "../models/user.js";

export const sendComment = async (req, res) => {
  const { gameId, userEmail, content, responseFor } = req.body;
  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: "Bạn phải đăng nhập để bình luận." });
    }
    const userName = user.name;

    const newComment = new GameComment({
      commentId: `CMT-${Date.now()}`,
      gameId: gameId,
      content: content,
      userEmail: userEmail,
      userName: userName,
      responseFor: responseFor,
    });

    await newComment.save();

    return res.status(200).json({message: "Bạn đâ gửi bình luận"});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Xảy ra lỗi server khi comment " })
  }
};

export const getComment =async (req, res) => {
    const {gameId, responseFor} = req.query;

    try{
        const comments = await GameComment.find({gameId: gameId, responseFor: responseFor});
        
        return res.status(200).json({comments});
    }catch(err){
      console.log(err);
        return res.status(500).json({message: "Xảy ra lỗi server tải comment"})
    }
}
