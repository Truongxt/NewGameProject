import Transaction from "../models/transaction.js";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const transactionCreate = async (req, res) => {
  const { email, description, amount } = req.body;

  try {
    const newTransaction = new Transaction({
      transId: `TRANS-${Date.now()}`,
      email: email,
      description: description,
      amount: amount,
    });

    await newTransaction.save();

    return res.status(200).json({
      transId: newTransaction.transId,
      message: "Tạo transaction thành công",
    });
  } catch (err) {
    return res.status(500).json({ message: "Đã xảy ra lỗi khi giao dịch" });
  }
};

export const confirmTransaction = async (req, res) => {
  const { transId } = req.query;

  if (!transId) {
    return res.status(400).json({ message: "Thiếu thông tin giao dịch" });
  }

  try {
    const trans = await Transaction.findOne({ transId: transId });
    const user = await User.findOne({ email: trans.email });
    user.soDu += trans.amount;
    user.soTienDaNap += trans.amount;
    await user.save();

    if (trans.status == false) {
      trans.status = true;
      trans.balance = user.soDu;
      await trans.save();
    }
    return res.status(200).json({
      message: "Giao dịch thành công!",
    });
  } catch (err) {
    return res.status(500).json({ message: "Đã xảy ra lỗi khi giao dịch" });
  }
};

export const getConfirmUrl = async (req, res) => {
  const { transId } = req.query;
  const dataQr = `${process.env.NGROK_API_URL}/trans/confirm-deposit?transId=${transId}`;

  return res.json({ dataQr });
};

export const checkStatus = async (req, res) => {
  const { transId } = req.query;

  try {
    const trans = await Transaction.findOne({ transId: transId });
    if (trans == undefined) {
      return res.status(404).json({ message: "Giao dịch không tồn tại" });
    }
    return res.json({ status: trans.status });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi kiểm tra trạng thái giao dich" });
  }
};

export const deleteTransaction = async (req, res) => {
  const { transId } = req.query;

  try {
    const deletedTransaction = await Transaction.findOneAndDelete({
      transId: transId,
    });

    if (!deletedTransaction) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy giao dịch để xóa" });
    }

    return res.status(200).json({
      message: "Xóa giao dịch thành công",
      deletedTransaction,
    });
  } catch (err) {
    console.error("Lỗi khi xóa giao dịch:", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi xóa giao dịch" });
  }
};

export const getTransactionByEmail = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Thiếu thông tin email" });
  }

  try {
    const transactions = await Transaction.find({ email: email });

    if (transactions.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy giao dịch nào" });
    }

    return res.status(200).json({
      message: "Lấy danh sách giao dịch thành công",
      transactions,
    });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách giao dịch:", err);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi lấy danh sách giao dịch" });
  }
};
