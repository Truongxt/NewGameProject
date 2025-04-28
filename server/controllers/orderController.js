import GameKey from "../models/GameKey.js";
import Order from "../models/order.js";
import User from "../models/user.js"
import { generateRandomCode } from "../utils/generateRandomCode.js";
import { sendOrderEmail } from "../utils/mailer.js";

export const sendOrderMail = async (req, res) => {
  const { receiver, orderId } = req.body;
  try {
    const order = await Order.findOne({ orderId });

    let products = [];

    order.items.map((item) => {
      products.push({ productName: item.productName, quantity: item.quantity, keys: item.keys });
    })

    await sendOrderEmail(receiver, { orderId: orderId, orderDate: order.orderDate, total: order.totalAmount, products })
    return res.status(200).json({ message: "Ok" });
  } catch (err) {
    throw err;
  }
}

export const payBill = async (req, res) => {
  const { email, items, receiver, totalAmount } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    }

    // Kiểm tra và xử lý key game cho từng sản phẩm
    for (const item of items) {
      const { productID, productName, quantity } = item;

      // Lấy key game từ database
      const gameKey = await GameKey.findOne({ gameId: productID });
      if (!gameKey || !gameKey.gameKeys || gameKey.gameKeys.length === 0) {
        return res.status(400).json({
          message: `Sản phẩm: ${productName} đã hết hàng. Vui lòng xóa sản phẩm ra giỏ hàng!`,
        });
      }

      if (gameKey.gameKeys.length < quantity) {
        return res.status(400).json({
          message: `Không đủ key game cho : ${productName}. Số lượng còn lại: ${gameKey.gameKeys.length}`,
        });
      }

      // Lấy số lượng key game tương ứng
      const keysToSend = gameKey.gameKeys.splice(0, quantity);
      item.keys = keysToSend;
      await gameKey.save(); 
    }

    // Tạo đơn hàng sau khi xử lý thành công
    const newOrder = new Order({
      orderId: `ORD-${Date.now()}`,
      userEmail: email,
      items,
      receiver,
      totalAmount,
    });

    user.soDu -= totalAmount; // Trừ số dư người dùng
    await user.save();
    await newOrder.save();

    return res.status(200).json({
      message: "Thanh toán thành công và key game đã được gửi qua email",
      order: newOrder,
    });
  } catch (err) {
    console.error("Lỗi khi xử lý thanh toán:", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi thanh toán" });
  }
};
export const getOrders = async (req, res) => {
  const { email } = req.query;

  try {
    const orders = await Order.find({ userEmail: email });

    if (orders.length == 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Lỗi khi lấy danh sách đơn hàng: ", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng" });
  }
}

export const getOrdersById = async (req, res) => {
  const { orderId } = req.query;

  try {
    const order = await Order.findOne({ orderId: orderId });

    if (order == null) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
    return res.status(200).json({ order });
  } catch (err) {
    console.log("Lỗi khi lấy danh sách đơn hàng với orderId: ", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng by orderId" })
  }
}

export const getAverageRevenueByMonth = async (req, res) => {
  try {
    //lấy ngày tháng hiện tại
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Tháng hiện tại (1-12)
    const year = currentDate.getFullYear(); // Năm hiện tại

    // Kiểm tra nếu thiếu tháng hoặc năm
    if (!month || !year) {
      return res.status(400).json({ message: "Thiếu thông tin tháng hoặc năm" });
    }

    // Tìm các đơn hàng trong tháng và năm cụ thể
    const startDate = new Date(year, month - 1, 1); // Ngày đầu tiên của tháng
    const endDate = new Date(year, month, 0); // Ngày cuối cùng của tháng

    const orders = await Order.find({
      orderDate: { $gte: startDate, $lte: endDate },
    });

    // Tính tổng doanh thu
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Tính trung bình doanh thu
    const averageRevenue = orders.length > 0 ? totalRevenue / orders.length : 0;

    return res.status(200).json({
      message: "Tính trung bình doanh thu thành công",
      averageRevenue,
    });
  } catch (error) {
    console.error("Lỗi khi tính trung bình doanh thu:", error);
    return res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};