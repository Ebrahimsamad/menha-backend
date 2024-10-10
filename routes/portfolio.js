const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const singleImageUpload = require("../middleware/uploadSingleImage");
const auth = require("../middleware/auth");
const validation = require("../middleware/JoiValidation");
const isAdminCheck = require("../middleware/adminRoleCheck");
const {
  portfolioValidationSchema,
  updatePortfolioValidation,
} = require("../utils/validation/portfolio");
const {
  createPortfolio,
  getAllPortfolios,
  getPortfolioById,
  getUserProfile,
  updatePortfolio,
  deletePortfolio,
  buyPortfolio,
  completePayment,
  cancel,
  acceptProtfolio,
  rejectPortfolio,
  getFreePlan
} = require("../controllers/portfolio");

router.post(
  "/",
  auth,
  upload.fields([
    { name: "militaryStatusImage", maxCount: 1 },
    { name: "IDImage", maxCount: 1 },
    { name: "graduationImage", maxCount: 1 },
  ]),
  validation(portfolioValidationSchema),
  singleImageUpload,
  createPortfolio
);

router.get("/", auth, isAdminCheck(true), getAllPortfolios);

router.get("/user", auth, getUserProfile);


router.post("/buy",auth, buyPortfolio);

router.post("/free", auth, getFreePlan);

router.get("/complete", completePayment);

router.get("/cancel", cancel);

router.post("/accept/:id", auth, isAdminCheck(true),acceptProtfolio);

router.post("/reject/:id", auth, isAdminCheck(true), rejectPortfolio);

router.get("/:id", auth, isAdminCheck(true), getPortfolioById);

router.patch(
  "/:id",
  auth,
  upload.fields([
    { name: "militaryStatusImage", maxCount: 1 },
    { name: "IDImage", maxCount: 1 },
    { name: "graduationImage", maxCount: 1 },
  ]),
  validation(updatePortfolioValidation),
  singleImageUpload,
  updatePortfolio
);

router.delete("/:id", auth, deletePortfolio);

module.exports = router;
