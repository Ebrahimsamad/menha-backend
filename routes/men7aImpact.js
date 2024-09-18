const express = require("express");
const router = express.Router();
const {impact} = require("../controllers/men7aImpact")


router.get("/", impact);

module.exports = router;
