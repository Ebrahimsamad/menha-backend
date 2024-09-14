const express = require("express");
const router = express.Router();
const {
  createModeOfStudy,
  getAllModesOfStudy,
  deleteModeOfStudyById
} = require("../controllers/modeOfStudy");
const validation = require("../middleware/JoiValidation");
const { modeofstudyvaldate }=require('../utils/validation/modeOfStudy')


router.post("/",validation(modeofstudyvaldate) ,createModeOfStudy);

router.get("/", getAllModesOfStudy);

router.delete("/:id", deleteModeOfStudyById);

module.exports = router;
