import express from 'express'
import { checkStatus, confirmTransaction, deleteTransaction, getConfirmUrl, getTransactionByEmail, transactionCreate } from '../controllers/transactionController.js'

const transRoute = express.Router();

transRoute.post("/deposit", transactionCreate);
transRoute.get("/confirm-deposit", confirmTransaction);
transRoute.get("/get-confirm", getConfirmUrl);
transRoute.get("/status", checkStatus);
transRoute.delete("/delete", deleteTransaction);
transRoute.get("/get-trans-by-email", getTransactionByEmail);
export default transRoute;