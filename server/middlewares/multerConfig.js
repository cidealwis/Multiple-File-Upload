import multer from "multer";
import path from "path";
import fs from "fs";

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userNic = req.body.nic;

        // Define the base upload path
        const baseDir = path.join("uploads", userNic);

        // Create directories if they don't exist
        if (!fs.existsSync(baseDir)) {
            fs.mkdirSync(baseDir, { recursive: true });
        }

        // Determine the subdirectory based on the file field name
        let subDir = "";
        if (file.fieldname === "cv") {
            subDir = "cv";
        } else if (file.fieldname === "image") {
            subDir = "image";
        }

        // Create the subdirectory path
        const uploadPath = path.join(baseDir, subDir);
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }

        // Set the destination for the file
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use the original filename or create a custom filename
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Set up Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // limit file size to 5MB
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "application/pdf"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Unsupported file type"), false);
        }
    }
});

export default upload;
