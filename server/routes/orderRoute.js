import express from 'express'
import {getOrders, payBill} from '../controllers/orderController.js'

const orderRoute = express.Router();

orderRoute.post("/pay-bill", payBill);
orderRoute.get("/get-orders", getOrders);

export default orderRoute;