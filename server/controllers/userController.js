import User from '../models/user.js'
import { sendVerificationEmail } from '../utils/mailer.js';

export const sendCode = async (req, res) => {
    const { email, subject, content } = req.body;
    
    const code = Math.floor(100000 + Math.random() * 900000);
  
    try {
      await sendVerificationEmail(email, subject, content, code);

      const user = await User.findOneAndUpdate(
        { email }, 
        { authCode: code }
      );

      return res.json({ message: "Đã gửi mã xác thực", code }); 
    } catch (err) {
      console.error("Lỗi gửi email:", err);
      return res.status(500).json({ message: "Không thể gửi email" });
    }
  };

  export const getAuthCode = async (req, res) =>{
    const {email} = req.query;
    
    try{
      const user = await User.findOne({email});

      return res.json({authCode: user.authCode});
    }catch(error){
      console.log("Lỗi khi lấy mã xác thực: "+error)
      return res.status(500).json({ message: "Lỗi server" });
    }
  }

  export const resetAuthCode = async (req, res)=>{
    const {email} = req.body;
    try{
      const user = await User.findOne({email: email});

      user.authCode = null;
      await user.save();
    }catch(err){
      console.log("Lôĩ khi reset authCode " + err);
    }
  }