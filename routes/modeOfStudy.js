const express = require("express");
const router = express.Router();
const {
  createModeOfStudy,
  getAllModesOfStudy,
  deleteModeOfStudyById,
  editModeOfStudyById
} = require("../controllers/modeOfStudy");
const validation = require("../middleware/JoiValidation");
const { modeofstudyvaldate } = require("../utils/validation/modeOfStudy");
const isAdminCheck = require("../middleware/adminRoleCheck");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  isAdminCheck(true),
  validation(modeofstudyvaldate),
  createModeOfStudy
);

router.get("/", getAllModesOfStudy);

router.patch("/:id", auth, isAdminCheck(true), validation(modeofstudyvaldate), editModeOfStudyById);

router.delete("/:id", auth, isAdminCheck(true), deleteModeOfStudyById);

module.exports = router;
