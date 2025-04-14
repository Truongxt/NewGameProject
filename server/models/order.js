import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userEmail: { type: String, required: true },
  items: [
    {
      productID: { type: String, required: true },
      image: {type: String, require: true},
      productName: {type: String, require: true},
      quantity: { type: Number, required: true },
      totalPrice: {type: Number, require: true}
    },
  ],
  receiver: {type: String, required: true},
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true, default: Date.now },
});

const Order =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default Order;