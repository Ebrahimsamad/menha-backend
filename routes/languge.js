const express = require("express");
const router = express.Router();
const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById
} = require("../controllers/language");
const validation = require("../middleware/JoiValidation");
const {
  languageValidationCreate
}=require('../utils/validation/language')


router.post("/", validation(languageValidationCreate),createLanguage);


router.get("/", getAllLanguages);


router.delete("/:id", deleteLanguageById);

module.exports = router;
 