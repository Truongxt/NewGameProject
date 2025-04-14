import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    transId: {type: String, require: true, unique: true},
    email: {type:String, require: true},
    transDate: {type: Date, require: true, default: Date.now()},
    status: {type: Boolean, require: true, default: false},
    description: { type: String},
    amount: {type: Number, require: true},
    balance: {type: Number, require: false}
});

const Transaction =
 mongoose.model("Transaction", TransactionSchema);

export default Transaction;