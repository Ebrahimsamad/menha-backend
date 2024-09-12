const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const singleImageUpload = require("../middleware/uploadSingleImage");
const {
  createUser,
  loginUser,
  updateProfile,
  changePassword,
  forgetPasswordUser,
  resetPasswordUser,
} = require("../utils/validation/user");
const validation = require("../middleware/JoiValidation");
const {
  signup,
  login,
  updateProfileUser,
  changeUserPassword,
  forgetPassword,
  resetPassword,
} = require("../controllers/user");
const auth = require("../middleware/auth");

router.post("/login", validation(loginUser), login);
router.post(
  "/signup",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validation(createUser),
  singleImageUpload,
  signup
);
router.patch(
  "/update-profile",
  auth,
  upload.fields([{ name: "image", maxCount: 1 }]),
  validation(updateProfile),
  singleImageUpload,
  updateProfileUser
);
router.patch(
  "/change-password",
  auth,
  validation(changePassword),
  changeUserPassword
);
router.post("/forget-password", validation(forgetPasswordUser), forgetPassword);
router.post("/reset-password", validation(resetPasswordUser), resetPassword);

module.exports = router;
