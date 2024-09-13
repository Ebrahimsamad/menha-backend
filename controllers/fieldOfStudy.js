const FieldOfStudy = require("../models/fieldOfStudy");
const CustomError = require("../utils/customError");

const createFieldOfStudy = async (req, res, next) => {
  try {
    const { fieldOfStudy } = req.body;

    const existingFieldOfStudy = await FieldOfStudy.findOne({ fieldOfStudy });
    if (existingFieldOfStudy) {
      return next(new CustomError("Field of Study already exists.", 409));
    }

    const newFieldOfStudy = new FieldOfStudy({ fieldOfStudy });
    await newFieldOfStudy.save();
    res
      .status(201)
      .json({
        message: "Field of Study created successfully",
        newFieldOfStudy,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

const getAllFieldsOfStudy = async (req, res, next) => {
  try {
    const fieldsOfStudy = await FieldOfStudy.find({});
    res.status(200).json(fieldsOfStudy);
  } catch (error) {
    next(new CustomError("Error fetching fields of study.", 500));
  }
};

const deleteFieldOfStudyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedFieldOfStudy = await FieldOfStudy.findByIdAndDelete(id);

    if (!deletedFieldOfStudy) {
      return next(new CustomError("Field of Study not found.", 404));
    }

    res
      .status(200)
      .json({
        message: "Field of Study deleted successfully",
        deletedFieldOfStudy,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

module.exports = {
  createFieldOfStudy,
  getAllFieldsOfStudy,
  deleteFieldOfStudyById,
};
