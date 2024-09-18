const User = require("../models/user");
const Scholarship = require('../models/scholarship');
const University = require ("../models/university.js");
const CustomError = require("../utils/customError");

exports.impact = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments({ isAdmin: false });
        const totalScholarships = await Scholarship.countDocuments();
        const totalUniversities = await University.countDocuments();

        res.status(200).json({
            totalUsers,
            totalScholarships,
            totalUniversities
        });
    } catch (error) {
        next(new CustomError("Internal server error.", 500));
    }
};
