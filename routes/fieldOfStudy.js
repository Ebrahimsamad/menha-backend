
const express = require("express");
const router = express.Router();
const {
  createFieldOfStudy,
  getAllFieldsOfStudy,
  deleteFieldOfStudyById
} = require("../controllers/fieldOfStudy");
const validation =require('../middleware/JoiValidation')
const{ createFieldOfStudyValidation}= require('../utils/validation/fieldofstudy')

router.post("/", validation(createFieldOfStudyValidation),createFieldOfStudy);

router.get("/", getAllFieldsOfStudy);

router.delete("/:id", deleteFieldOfStudyById);

module.exports = router;
