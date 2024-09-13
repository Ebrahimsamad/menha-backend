const express = require("express");
const router = express.Router();
const validation = require("../middleware/JoiValidation");
const {
  languageValidationCreate,languageValidationEdit
} = require("../utils/validation/validateLanguage");
const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById
} = require("../controllers/language");


router.post("/",validation(languageValidationCreate) , createLanguage);


router.get("/", getAllLanguages);


router.delete("/:id", deleteLanguageById);

module.exports = router;
