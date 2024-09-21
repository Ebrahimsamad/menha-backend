const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {toggleSavedScholarship,getSavedScholarships}=require("../controllers/savedScholarshops")

router.post("/", auth, toggleSavedScholarship);
router.get("/", auth, getSavedScholarships);

module.exports = router;