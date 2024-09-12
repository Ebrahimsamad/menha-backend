const ModeOfStudy = require("../models/modeOfStudy");
const CustomError = require("../utils/customError");

const createModeOfStudy = async (req, res, next) => {
  try {
    const { modeOfStudy } = req.body;

    const existingModeOfStudy = await ModeOfStudy.findOne({ modeOfStudy });
    if (existingModeOfStudy) {
      return next(new CustomError("Mode of Study already exists.", 409));
    }

    const newModeOfStudy = new ModeOfStudy({ modeOfStudy });
    await newModeOfStudy.save();
    res
      .status(201)
      .json({
        message: "Mode of Study created successfully",
        newModeOfStudy,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

const getAllModesOfStudy = async (req, res, next) => {
  try {
    const modesOfStudy = await ModeOfStudy.find({});
    res.status(200).json(modesOfStudy);
  } catch (error) {
    next(new CustomError("Error fetching modes of study.", 500));
  }
};

const deleteModeOfStudyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedModeOfStudy = await ModeOfStudy.findByIdAndDelete(id);

    if (!deletedModeOfStudy) {
      return next(new CustomError("Mode of Study not found.", 404));
    }

    res
      .status(200)
      .json({
        message: "Mode of Study deleted successfully",
        deletedModeOfStudy,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

module.exports = {
  createModeOfStudy,
  getAllModesOfStudy,
  deleteModeOfStudyById,
};
