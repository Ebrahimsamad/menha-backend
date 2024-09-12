const express = require("express");
const router = express.Router();
const validateLanguage = require('../middleware/validateLanguage');

const {
  createLanguage,
  getAllLanguages,
  deleteLanguageById
} = require("../controllers/language");


router.post("/", validateLanguage, createLanguage);


router.get("/", getAllLanguages);


router.delete("/:id", deleteLanguageById);

module.exports = router;
// git checkout -b hossam/feature/create-update-user-profile-and-change-user-password