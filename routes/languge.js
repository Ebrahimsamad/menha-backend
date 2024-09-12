const express = require("express");
const router = express.Router();
const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById
} = require("../controllers/language");


router.post("/", createLanguage);


router.get("/", getAllLanguages);


router.delete("/:id", deleteLanguageById);

module.exports = router;
 