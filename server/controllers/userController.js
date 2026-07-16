const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const { uploadToImageKit } = require("../services/imageKitService");

// Configure multer storage (memory instead of disk)
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only images (jpeg, jpg, png, webp) are allowed"));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: fileFilter,
}).single("avatar");

const uploadAvatar = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: err.message });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Please upload a file" });
    }

    try {
      const fileName = `avatar-${req.user._id}-${Date.now()}${path.extname(req.file.originalname)}`;
      
      // Upload to ImageKit via service
      const response = await uploadToImageKit(req.file.buffer, fileName);

      const avatarUrl = response.url;

      // Update user in DB
      const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { avatarUrl },
        { returnDocument: 'after' } // Resolved Mongoose deprecation warning
      ).select("-password");

      res.status(200).json({
        success: true,
        message: "Avatar uploaded successfully to ImageKit",
        user: updatedUser,
      });
    } catch (error) {
      console.error("ImageKit Upload Error:", error);
      res.status(500).json({ success: false, message: error.message || "Server error during image upload" });
    }
  });
};

module.exports = {
  uploadAvatar,
};
