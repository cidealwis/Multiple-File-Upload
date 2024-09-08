
import User from "../models/User.js";
import bcrypt from "bcrypt";
export const createUser=async(userData)=>{
    try{
        

        const user=new User(userData);
        await user.save();

        return{success:true,status:201,message:'New User Save',data:user};
    }catch(error){
        return { success: false, status: 500, message: 'Internal Server Error', error: error.message };
    }
}

export const findUserByEmailAndNic = async (email, nic) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            return { success: true, status: 200, message: 'User found', data: user };
        } else {
            return { success: false, status: 404, message: 'User not found' };
        }
    } catch (error) {
        return { success: false, status: 500, message: 'Internal Server Error', error: error.message };
    }
};

