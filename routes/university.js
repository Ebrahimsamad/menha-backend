const express = require ("express");
const { createUniversity, editUniversity, getAllUniversity, getUniversityById, deleteUniversity } = require("../controllers/university");
const router = express.Router();

router.get("/" , getAllUniversity);

router.get("/:id" , getUniversityById);

router.post("/" , createUniversity);

router.put("/:id" , editUniversity);

router.delete("/:id" , deleteUniversity);


module.exports = router;

