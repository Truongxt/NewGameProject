import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    sex: {type: String, required: true},
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true  },
    username:{type: String, required: true, unique: true},
    password: { type: String, required: true },
    cartData: {
        type: Array, default: []
    },
    createDate: { type: Date, default: Date.now },
    soDu:{type: Number, default: 0},
    soTienDaNap:{type: Number, default: 0},
    authCode: {type: Number}
});

const User = mongoose.model('User', UserSchema);

export default User;