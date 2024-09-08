import mongoose from "mongoose";

const schema=mongoose.Schema;

const userData = new schema({
    name: { type: String },
    district: { type: String },
    nic: { type: String, index: true }, // Add an index for better search performance
    age: { type: String },
    date: { type: String },
    email: { type: String, index: true }, // Add an index for better search performance
    image: { type: String },
    cv: { type: String },
    isVerify: { type: String }
});
const User=mongoose.model('User',userData);
export default User;