const express = require("express");
const router = express.Router();
const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById,
  editLanguageById
} = require("../controllers/language");
const validation = require("../middleware/JoiValidation");
const { languageValidationCreate,languageValidationEdit } = require("../utils/validation/language");
const isAdminCheck = require("../middleware/adminRoleCheck");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  isAdminCheck(true),
  validation(languageValidationCreate),
  createLanguage
);

router.get("/", getAllLanguages);


router.patch("/:id", auth, isAdminCheck(true), validation(languageValidationEdit), editLanguageById);

router.delete("/:id", auth, isAdminCheck(true), deleteLanguageById);

module.exports = router;
