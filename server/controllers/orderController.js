import Order from "../models/order.js";
import User from "../models/user.js"
import { generateRandomCode } from "../utils/generateRandomCode.js";
import { sendOrderEmail } from "../utils/mailer.js";

export const sendOrderMail = async (req, res) => {
  const {receiver, orderId} = req.body;
  try{
    const order = await Order.findOne({orderId});

    let products = [];

    order.items.map((item) => {
      let keys = [];
      for(let i = 0; i < item.quantity; i++){
        keys.push(generateRandomCode());
      }
      products.push({productName: item.productName, quantity: item.quantity, keys});
    })

    await sendOrderEmail(receiver, {orderId: orderId, orderDate: order.orderDate, total: order.totalAmount, products})
    return res.status(200).json({message: "Ok"});
  }catch(err){
    throw err;
  }
}

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