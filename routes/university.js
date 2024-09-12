const express = require ("express");
const { createUniversity, editUniversity } = require("../controllers/university");
const router = express.Router();

router.post("/universities" , createUniversity);

router.put("/universities/:id" , editUniversity);

module.exports = router;

