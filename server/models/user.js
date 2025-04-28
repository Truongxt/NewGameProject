import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sex: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false, default: null },
  userName: { type: String, require: true, unique: true },
  tempPassword: {type: String, require: false},
  password: { type: String, required: true },
  cartData: {
    type: Array,
    default: [],
  },
  createDate: { type: Date, default: Date.now },
  soDu: { type: Number, default: 0 },
  soTienDaNap: { type: Number, default: 0 },
  authCode: { type: Number },
  verified: { type: Boolean, default: false },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
});

const User = mongoose.model("User", UserSchema);

export default User;
