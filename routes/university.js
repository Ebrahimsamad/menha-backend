const express = require ("express");
const { createUniversity, editUniversity, getAllUniversity, getUniversityById, deleteUniversity } = require("../controllers/university");
const multer = require("multer");
const upload = multer();
const singleImageUpload = require("../middleware/uploadSingleImage");
const validation = require("../middleware/JoiValidation");
const {editUniversityValidation,createUniversityValidation }=require('../utils/validation/university')
const router = express.Router();
router.get("/" , getAllUniversity);

router.get("/:id" , getUniversityById);

router.post("/" ,upload.fields([{ name: "image", maxCount: 1 }]),
 validation(createUniversityValidation),
 singleImageUpload
 ,createUniversity);

router.patch("/:id" ,upload.fields([{ name: "image", maxCount: 1 }]),
validation(editUniversityValidation),
singleImageUpload
,editUniversity);


router.delete("/:id" , deleteUniversity);


module.exports = router;

