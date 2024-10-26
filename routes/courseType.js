const express = require("express");
const router = express.Router();
const validation = require("../middleware/JoiValidation");
const {
  createCourseTypeValidation,
} = require("../utils/validation/courseType");
const isAdminCheck = require("../middleware/adminRoleCheck");
const auth = require("../middleware/auth");

const {
  createCourseType,
  getAllCourseTypes,
  deleteCourseTypeById,
  editCourseTypeById
} = require("../controllers/courseType");

router.post(
  "/",
  auth,
  isAdminCheck(true),
  validation(createCourseTypeValidation),
  createCourseType
);

router.get("/", getAllCourseTypes);

router.patch("/:id", auth, isAdminCheck(true), validation(createCourseTypeValidation), editCourseTypeById);

router.delete("/:id", auth, isAdminCheck(true), deleteCourseTypeById);

module.exports = router;
