const express = require("express");
const router = express.Router();
const {getUserMatchingPercentage}=require("../controllers/MatchingPercentage")
const auth = require("../middleware/auth");

router.get("/",auth, getUserMatchingPercentage);

module.exports = router;
