const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {toggleSavedScholarship,getSavedScholarships ,getAllSavedScholarships}=require("../controllers/savedScholarshops")

router.post("/", auth, toggleSavedScholarship);
router.get("/", auth, getSavedScholarships);
router.get("/all", auth, getAllSavedScholarships);

module.exports = router;
