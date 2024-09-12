const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const singleImageUpload = require("../middlewares/uploadSingleImage");
const {
    createUser,
    loginUser,
    updateProfile,
    changePassword,
    forgetPasswordUser,
    resetPasswordUser,
} = require("../utils/validation/user");
const validation = require("../middlewares/JoiValidation");
const {
    signup,
    login,
    updateProfileUser,
    changeUserPassword,
    forgetPassword,
    resetPassword,
} = require("../controllers/user");
const auth = require("../middlewares/auth");

router.post("/login", validation(loginUser), login);
router.post(
    "/signup",
    upload.fields([{ name: "image", maxCount: 1 }]),
    validation(createUser),
    singleImageUpload,
    signup
);
router.patch(
    "/updateProfile",
    auth,
    upload.fields([{ name: "image", maxCount: 1 }]),
    validation(updateProfile),
    singleImageUpload,
    updateProfileUser
);
router.patch(
    "/changePassword",
    auth,
    validation(changePassword),
    changeUserPassword
);
router.post(
    "/forgetPassword",
    validation(forgetPasswordUser),
    forgetPassword
);
router.post(
    "/resetPassword",
    validation(resetPasswordUser),
    resetPassword
);

module.exports = router;
