import express from "express";
import { createUserController,getUserController } from "../controllers/user.js";
import upload from "../middlewares/multerConfig.js"; // import the Multer configuration

const router = express.Router();

// Handle user creation with file uploads
router.post("/create", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), createUserController);
router.get("/getUser", getUserController);

export { router as UserRouter };
