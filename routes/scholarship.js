const express = require("express");
const router = express.Router();
const {createScholarship,editScholarship,getScholarshipById,deleteScholarship,getAllScholarships}= require("../controllers/scholarship")
const validation = require("../middleware/JoiValidation");
const {createScholarshipValidation,
    editScholarshipValidation}=require('../utils/validation/scholarship')
router.post("/",validation(createScholarshipValidation), createScholarship);

router.patch("/:id", validation(editScholarshipValidation),editScholarship);

router.get("/",getAllScholarships);

router.get("/:id",getScholarshipById)

router.delete("/:id",deleteScholarship)

module.exports = router;