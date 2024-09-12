const express = require ("express");
const { createUniversity, editUniversity, getAllUniversity, getUniversityById, deleteUniversity } = require("../controllers/university");
const router = express.Router();

router.get("/universities" , getAllUniversity);

router.get("/universities/:id" , getUniversityById);

router.post("/universities" , createUniversity);

router.put("/universities/:id" , editUniversity);

router.delete("/universities/:id" , deleteUniversity);

module.exports = router;

