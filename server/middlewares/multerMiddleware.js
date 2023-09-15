import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    // Specify the destination directory where files will be stored.
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    // Use a unique filename, including the original filename and a timestamp.
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (_req, file, cb) => {
  // Define the allowed file extensions.
  const allowedExtensions = [".jpg", ".jpeg", ".webp", ".png", ".mp4"];

  // Check if the file's extension is in the allowed list.
  const ext = path.extname(file.originalname).toLowerCase();
  if (!allowedExtensions.includes(ext)) {
    cb(new Error(`Unsupported file type! ${ext}`), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter,
});

export default upload;
