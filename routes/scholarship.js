const express = require("express");
const router = express.Router();
const {createScholarship,editScholarship}= require("../controllers/scholarship")

router.post("/", createScholarship);

router.put("/:id", editScholarship);

module.exports = router;