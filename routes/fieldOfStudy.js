
const express = require("express");
const router = express.Router();
const {
  createFieldOfStudy,
  getAllFieldsOfStudy,
  deleteFieldOfStudyById
} = require("../controllers/fieldOfStudy");

router.post("/", createFieldOfStudy);

router.get("/", getAllFieldsOfStudy);

router.delete("/:id", deleteFieldOfStudyById);

module.exports = router;
