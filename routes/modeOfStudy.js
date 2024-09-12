const express = require("express");
const router = express.Router();
const {
  createModeOfStudy,
  getAllModesOfStudy,
  deleteModeOfStudyById
} = require("../controllers/modeOfStudy");

router.post("/", createModeOfStudy);

router.get("/", getAllModesOfStudy);

router.delete("/:id", deleteModeOfStudyById);

module.exports = router;
