const express = require("express");
const router = express.Router();

const { creatAdmin, editAdmin, deleteAdmin, getAllAdmin } = require("../controllers/admin");

const isAdminCheck = require("../middlewares/adminRoleCheck");
const auth = require("../middlewares/auth");
const validation = require("../middlewares/JoiValidation");


const { createAdminValidation, updateAdminValidation } = require("../utils/validation/admin");



router.post(
    "/",
    auth,
    isAdminCheck(true),
    validation(createAdminValidation),
    creatAdmin
);
router.get(
    "/",
    auth,
    isAdminCheck(true),
    getAllAdmin

)
router.patch("/:id",
    auth,
    isAdminCheck(true),
    validation(updateAdminValidation),
    editAdmin
)
router.delete("/:id",
    auth,
    isAdminCheck(true),
    deleteAdmin
)

module.exports = router;