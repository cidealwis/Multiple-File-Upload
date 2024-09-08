import { createUser,findUserByEmailAndNic } from "../services/user.js";

export const createUserController = async (req, res) => {
    try {
        const userData = req.body;
        
        // Check if files were uploaded
        if (req.files) {
            const userEmail = userData.email;

            if (req.files.image) {
                userData.image = req.files.image[0].path; // save the image path
            }
            if (req.files.cv) {
                userData.cv = req.files.cv[0].path; // save the CV path
            }
        }

        const result = await createUser(userData);
        return res.status(result.status).json({ success: result.success, message: result.message, user: result.data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export const getUserController = async (req, res) => {
    try {
        const { email, nic } = req.query;

        // Validate the input
        if (!email || !nic) {
            return res.status(400).json({ success: false, message: 'Email and NIC are required' });
        }

        const result = await findUserByEmailAndNic(email, nic);
        return res.status(result.status).json({ success: result.success, message: result.message, user: result.data });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};