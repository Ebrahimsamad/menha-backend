const express = require("express");
const {
  createUniversity,
  editUniversity,
  getAllUniversity,
  getUniversityById,
  deleteUniversity,
} = require("../controllers/university");
const multer = require("multer");
const upload = multer();
const singleImageUpload = require("../middleware/uploadSingleImage");
const validation = require("../middleware/JoiValidation");
const {
  editUniversityValidation,
  createUniversityValidation,
} = require("../utils/validation/university");
const router = express.Router();
const isAdminCheck = require("../middleware/adminRoleCheck");
const auth = require("../middleware/auth");

router.get("/", getAllUniversity);

router.get("/:id", getUniversityById);

router.post(
  "/",
  auth,
  isAdminCheck(true),
  upload.fields([{ name: "image", maxCount: 1 }]),
  validation(createUniversityValidation),
  singleImageUpload,
  createUniversity
);

router.patch(
  "/:id",
  auth,
  isAdminCheck(true),
  upload.fields([{ name: "image", maxCount: 1 }]),
  validation(editUniversityValidation),
  singleImageUpload,
  editUniversity
);

router.delete("/:id", auth, isAdminCheck(true), deleteUniversity);

module.exports = router;
