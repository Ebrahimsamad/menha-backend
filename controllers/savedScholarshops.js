const User = require("../models/user");
const Scholarship = require("../models/scholarship");
const CustomError = require("../utils/customError");
const MatchingPercentage = require("../models/portfolioMatchingWithScholarships");

exports.toggleSavedScholarship = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { scholarshipId } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    const scholarship = await Scholarship.findById(scholarshipId);
    if (!scholarship) {
      return next(new CustomError("scholarship not found", 404));
    }

    const isSaved = user.savedScholarshipIds.includes(scholarshipId);

    if (isSaved) {
      user.savedScholarshipIds = user.savedScholarshipIds.filter(
        (id) => id.toString() !== scholarshipId
      );
      await user.save();
      return res
        .status(200)
        .send({
          message: "Scholarship removed from saved list",
          savedScholarshipIds: user.savedScholarshipIds,
        });
    } else {
      user.savedScholarshipIds.push(scholarshipId);
      await user.save();
      return res
        .status(200)
        .send({
          message: "Scholarship added to saved list",
          savedScholarshipIds: user.savedScholarshipIds,
        });
    }
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};
exports.getSavedScholarships = async (req, res,next) => {
  try {
    const { id } = req.user;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const user = await User.findById(id).populate({
      path: "savedScholarshipIds",
      options: {
        limit,
        skip,
      },
      populate: [
        { path: "fieldOfStudyId" },
        { path: "courseTypeId" },
        { path: "modeOfStudyId" },
        { path: "universityId" },
        { path: "languageId" },
      ],
    });

    if (!user) {
      return next(new CustomError("User not found", 404));
    }

    const total = await User.findById(id).select("savedScholarshipIds").lean();
    const totalScholarships = total.savedScholarshipIds.length;

    const totalPages = Math.ceil(totalScholarships / limit);

    const validScholarships = user.savedScholarshipIds;
    const currentDate = new Date();
    const userBuydate = new Date(user.expBuyPortfolio);
    const matchingPercentageUser = await MatchingPercentage.findOne({
      userId: user.id,
    });
    if (userBuydate < currentDate || !matchingPercentageUser) {
      res.status(200).json({
        pagination: {
          totalItems: totalScholarships,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
        scholarships: validScholarships,
      });
    }else{
      const scholarshipsWithPercentage = validScholarships.map((scholarship) => {
        const percentage = matchingPercentageUser.matchingPercentage.find(
          (match) =>
            match.scholarshipId.toString() === scholarship._id.toString()
        ).percentage;

        return {
          percentage,
          ...scholarship.toObject()
        };
      });
      res.status(200).json({
        pagination: {
          totalItems: totalScholarships,
          totalPages,
          currentPage: page,
          pageSize: limit,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
        },
        scholarships: scholarshipsWithPercentage,
      });
    }
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

exports.getAllSavedScholarships = async (req, res,next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id)

    if (!user) {
      return next(new CustomError("User not found", 404));
    }
    res.status(200).json({
      scholarships: user.savedScholarshipIds,
    });
  } catch (error) {
    console.log(error)
    next(new CustomError("Internal server error.", 500));
  }
};
