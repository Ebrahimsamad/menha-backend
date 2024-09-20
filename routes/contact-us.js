const express = require("express");
const router = express.Router();
const { contactUs } = require("../controllers/contact-us"); // Correctly import the controller function

router.post("/", contactUs);

module.exports = router;
