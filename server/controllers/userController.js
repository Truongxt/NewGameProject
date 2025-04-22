import User from "../models/user.js";
import { sendVerificationEmail } from "../utils/mailer.js";
import jwt from "jsonwebtoken";
import doten from "dotenv";
import bcrypt from "bcrypt";

doten.config();

export const sendCode = async (req, res) => {
  const { email, subject, content } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000);

  try {
    await sendVerificationEmail(email, subject, content, code, "code");

    const user = await User.findOneAndUpdate({ email }, { authCode: code });

    return res.json({ message: "Đã gửi mã xác thực", code });
  } catch (err) {
    console.error("Lỗi gửi email:", err);
    return res.status(500).json({ message: "Không thể gửi email" });
  }
};

export const getAuthCode = async (req, res) => {
  const { email } = req.query;

  try {
    const user = await User.findOne({ email });

    return res.json({ authCode: user.authCode });
  } catch (error) {
    console.log("Lỗi khi lấy mã xác thực: " + error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const resetAuthCode = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });

    user.authCode = null;
    await user.save();
  } catch (err) {
    console.log("Lôĩ khi reset authCode " + err);
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, userName, password, phone } = req.body;

    // Kiểm tra email đã tồn tại
    let existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "Email này đã tồn tại" });
    }

    // Kiểm tra userName đã tồn tại
    existingUser = await User.findOne({ userName: userName });
    if (existingUser) {
      return res.status(400).json({ message: "User name đã tồn tại" });
    }

    // Tạo người dùng mới
    const newUser = new User({
      name,
      email,
      phone,
      userName,
      password: await bcrypt.hash(password, 10),
    });

    await newUser.save();

    // Tạo token xác thực
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const verificationLink = `http://localhost:5000/users/verify-account?token=${token}`;

    // Gửi email xác thực
    await sendVerificationEmail(
      email,
      "Xác thực tài khoản",
      "Link xác thực đăng ký tài khoản",
      verificationLink,
      "link"
    );

    return res.json({
      message:
        "Đăng ký tài khoản thành công. Vui lòng kiểm tra email để xác thực tài khoản",
    });
  } catch (error) {
    console.error("Lỗi khi đăng ký tài khoản:", error);
    return res.status(500).json({ message: "Lỗi server. Không thể đăng ký tài khoản" });
  }
};

export const verifyAccount = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return res.status(404).json({ message: "Không tìm thấy người dùng" });

    user.verified = true;
    await user.save();

    return res.json({ message: "Xác thực tài khoản thành công!" });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Link xác thực không hợp lệ hoặc đã hết hạn" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email : email });
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (user === undefined || !isMatch) {
      return res
        .status(401)
        .json({ message: "Tài khoản hoặc mật khẩu không chính xác" });
    }
    
    if (!user.verified) {
      return res.status(403).json({ message: "Tài khoản chưa được xác thực" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        name: user.name,
        sex: user.sex,
        email: user.email,
        userName: user.userName,
        createDate: user.createDate,
        soDu: user.soDu,
        soTienDaNap: user.soTienDaNap,
      },
      token,
    });
  } catch (err) {
    return res.status(500).json({ message: "Lỗi khi đăng nhập" });
  }
};

export const getCurrentUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Lấy token từ header
  if (!token) {
    return res.status(401).json({ message: "Không có token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Giải mã token

    // Kiểm tra token đã hết hạn chưa
    if (decoded.exp * 1000 < Date.now()) {
      return res.status(401).json({ message: "Token đã hết hạn" });
    }

    const user = await User.findOne({ email: decoded.email }); // Tìm người dùng theo email
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    return res.json({
      user: {
        name: user.name,
        sex: user.sex,
        email: user.email,
        userName: user.userName,
        createDate: user.createDate,
        soDu: user.soDu,
        soTienDaNap: user.soTienDaNap,
      },
    });
  } catch (err) {
    console.error("Lỗi khi xác thực token:", err);
    return res.status(401).json({ message: "Token không hợp lệ" });
  }
};

export const changePassword = async (req, res) =>{
  const {email, currentPass, newPass} = req.body;
  
  try{
    let user = await User.findOne({email: email});

    if(user == null){
      return res.status(404).json({message: "Không tồn tại user này"});
    }
    const isMatch = await bcrypt.compare(currentPass, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Mật khẩu hiện tại không đúng"});
    }

    const code = Math.floor(100000 + Math.random() * 900000);

    user.tempPassword = await bcrypt.hash(newPass, 10);
    await user.save();

    await sendVerificationEmail(
      email,
      "Đổi mật khẩu",
      "Vui lòng sử dụng mã xác thực bên dưới để đổi mật khẩu.",
      code,
      "code"
    );

    return res.status(200).json({message: "Mã xác thực đã được gửi đến email của bạn!"})
  }catch(err){
    return res.status(500).json({message: "Xảy ra lỗi khi đổi mật khẩu"});
  }
}

export const forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email này chưa đăng ký tài khoản!" });
    }

    const code = Math.floor(100000 + Math.random() * 900000); // Mã code dùng để đặt lại mật khẩu

    user.authCode = code;
    user.tempPassword = await bcrypt.hash(newPassword, 10); 
    await user.save();

    await sendVerificationEmail(
      email,
      "Đặt lại mật khẩu",
      "Vui lòng sử dụng mã xác thực bên dưới để đặt lại mật khẩu.",
      code,
      "code"
    );

    return res.json({ message: "Mã xác thực đã được gửi đến email của bạn." });
  } catch (err) {
    console.error("Lỗi khi gửi mã xác thực:", err);
    return res.status(500).json({ message: "Lỗi khi yêu cầu đặt lại mật khẩu!" });
  }
};

export const verifyResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email này chưa đăng ký tài khoản!" });
    }

    if (user.authCode != code) {
      return res.status(400).json({ message: "Mã xác thực không đúng hoặc đã hết hạn." });
    }

    user.password = user.tempPassword;
    user.authCode = null;
    user.tempPassword = null; 
    await user.save();

    return res.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (err) {
    console.error("Lỗi khi xác thực mã:", err);
    return res.status(500).json({ message: "Lỗi khi xác thực mã." });
  }
};



export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Tài khoản không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }

    if (user.role !== "ADMIN") {
      return res.status(403).json({ message: "Bạn không có quyền truy cập!" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error("Lỗi khi đăng nhập admin:", error);
    return res.status(500).json({ message: "Lỗi server!" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json(users);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách người dùng:", error);
    return res.status(500).json({ message: "Lỗi server!" });
  }
}