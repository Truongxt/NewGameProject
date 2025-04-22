import express from 'express'
import {getOrders, getOrdersById, payBill,getAverageRevenueByMonth} from '../controllers/orderController.js'

const orderRoute = express.Router();

orderRoute.post("/pay-bill", payBill);
orderRoute.get("/get-orders", getOrders);
orderRoute.get("/get-order", getOrdersById);
orderRoute.get("/get-average-revenue", getAverageRevenueByMonth);
export default orderRoute;