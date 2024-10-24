const express = require("express");
const router = express.Router();
const {
  createScholarship,
  editScholarship,
  getScholarshipById,
  deleteScholarship,
  getAllScholarships,
  getAllScholarshipsWithPercentage
} = require("../controllers/scholarship");
const validation = require("../middleware/JoiValidation");
const {
  createScholarshipValidation,
  editScholarshipValidation,
} = require("../utils/validation/scholarship");
const auth = require("../middleware/auth");
const isAdminCheck = require("../middleware/adminRoleCheck");

router.post(
  "/",
  auth,
  isAdminCheck(true),
  validation(createScholarshipValidation),
  createScholarship
);

router.patch(
  "/:id",
  auth,
  isAdminCheck(true),
  validation(editScholarshipValidation),
  editScholarship
);

router.get("/", getAllScholarships);

router.get("/percentage",auth, getAllScholarshipsWithPercentage);

router.get("/:id", getScholarshipById);

router.delete("/:id", auth, isAdminCheck(true), deleteScholarship);

module.exports = router;
