const express = require ("express");
const { createUniversity, editUniversity } = require("../controllers/university");
const router = express.Router();
const validation = require("../middleware/JoiValidation");
const {editUniversityValidation,createUniversityValidation}= require('../utils/validation/unvisrty')
router.post("/universities" ,validation(createUniversityValidation), createUniversity);

router.put("/universities/:id" , validation(editUniversityValidation),editUniversity);

module.exports = router;

