const express = require("express");
const router = express.Router();
const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById
} = require("../controllers/language");
const checkLanguageExists = require("../middleware/checkLanguageExists");


router.post("/", checkLanguageExists, createLanguage);


router.get("/", getAllLanguages);


router.delete("/:id", deleteLanguageById);

module.exports = router;
 