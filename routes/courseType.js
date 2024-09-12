const express = require("express");
const router = express.Router();
const {
  createCourseType,
  getAllCourseTypes,
  deleteCourseTypeById
} = require("../controllers/courseType");

router.post("/", createCourseType);

router.get("/", getAllCourseTypes);

router.delete("/:id", deleteCourseTypeById);

module.exports = router;
