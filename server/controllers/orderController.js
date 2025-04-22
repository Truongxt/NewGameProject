import Order from "../models/order.js";
import User from "../models/user.js"
export const payBill = async (req, res) => {
  const { email, image, items, receiver, totalAmount } = req.body;

  const user = await User.findOne({email: email});

  try {
    const newOrder = new Order({
      orderId: `ORD-${Date.now()}`,
      image: image,
      userEmail: email,
      items,
      receiver,
      totalAmount
    });

    user.soDu -= totalAmount;

    await user.save();
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

export const getOrdersById = async(req, res)=>{
  const {orderId} = req.query;

  try{
    const order = await Order.findOne({orderId: orderId});

    if(order == null){
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }
    return res.status(200).json({order});
  }catch(err){
    console.log("Lỗi khi lấy danh sách đơn hàng với orderId: ", err);
    return res.status(500).json({message: "Đã xảy ra lỗi khi lấy danh sách đơn hàng by orderId"})
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