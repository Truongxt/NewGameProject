import express from "express";
import userRoute from './routes/userRoute.js'
import gameRoute from './routes/gameRoute.js'
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from 'cors'
import orderRoute from "./routes/orderRoute.js";
import transRoute from "./routes/transactionRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/games", gameRoute);
app.use("/orders", orderRoute);
app.use("/trans", transRoute);

app.listen(port, () => {
  console.log(`Server is running at 
http://localhost:${port}`);
});
