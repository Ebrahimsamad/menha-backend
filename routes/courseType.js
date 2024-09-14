const express = require("express");
const router = express.Router();
const validation = require("../middleware/JoiValidation");
const {createCourseTypeValidation }=require('../utils/validation/courseType')
const {
  createCourseType,
  getAllCourseTypes,
  deleteCourseTypeById
} = require("../controllers/courseType");

router.post("/", validation(createCourseTypeValidation),createCourseType);

router.get("/", getAllCourseTypes);

router.delete("/:id", deleteCourseTypeById);

module.exports = router;
