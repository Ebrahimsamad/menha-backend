const express = require("express");
const router = express.Router();
const validation = require("../middleware/JoiValidation");
const {
  createFieldOfStudyValidation,
} = require("../utils/validation/Fieldofstudy");
const isAdminCheck = require("../middleware/adminRoleCheck");
const auth = require("../middleware/auth");

const {
  createFieldOfStudy,
  getAllFieldsOfStudy,
  deleteFieldOfStudyById,
  editFieldOfStudyById
} = require("../controllers/fieldOfStudy");

router.post(
  "/",
  auth,
  isAdminCheck(true),
  validation(createFieldOfStudyValidation),
  createFieldOfStudy
);

router.get("/", getAllFieldsOfStudy);


router.patch("/:id", auth, isAdminCheck(true), validation(createFieldOfStudyValidation), editFieldOfStudyById);

router.delete("/:id", auth, isAdminCheck(true), deleteFieldOfStudyById);

module.exports = router;
