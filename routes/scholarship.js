const express = require("express");
const router = express.Router();
const {createScholarship,editScholarship,getScholarshipById,deleteScholarship,getAllScholarships}= require("../controllers/scholarship")

router.post("/", createScholarship);

router.patch("/:id", editScholarship);

router.get("/",getAllScholarships);

router.get("/:id",getScholarshipById)

router.delete("/:id",deleteScholarship)

module.exports = router;