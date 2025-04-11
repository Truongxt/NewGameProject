import Order from "../models/order.js";

export const payBill = async (req, res) => {
  const { email, items, receiver, totalAmount } = req.body;

  try {
    const newOrder = new Order({
      orderId: `ORD-${Date.now()}`,
      userEmail: email,
      items,
      receiver,
      totalAmount
    });

    await newOrder.save();

    return res.status(200).json({
      message: "Thanh toán thành công",
      order: newOrder,
    });
  } catch (err) {
    console.error("Lỗi khi xử lý thanh toán:", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi thanh toán" });
  }
};

export const getOrders = async(req, res) => {
  const {email} = req.query;

  try{
    const orders = await Order.find({userEmail: email});

    if(orders.length == 0){
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
    return res.status(200).json({orders});
  }catch(err){
    console.error("Lỗi khi lấy danh sách đơn hàng: ", err);
    return res.status(500).json({ message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng" });
  }
}