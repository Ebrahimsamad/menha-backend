const CourseType = require("../models/courseType");
const CustomError = require("../utils/customError");

const createCourseType = async (req, res, next) => {
  try {
    const { courseType } = req.body;

    const existingCourseType = await CourseType.findOne({ courseType });
    if (existingCourseType) {
      return next(new CustomError("Course Type already exists.", 409));
    }

    const newCourseType = new CourseType({ courseType });
    await newCourseType.save();
    res
      .status(201)
      .json({
        message: "Course Type created successfully",
        newCourseType,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

const getAllCourseTypes = async (req, res, next) => {
  try {
    const courseTypes = await CourseType.find({});
    res.status(200).json(courseTypes);
  } catch (error) {
    next(new CustomError("Error fetching course types.", 500));
  }
};

const deleteCourseTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedCourseType = await CourseType.findByIdAndDelete(id);

    if (!deletedCourseType) {
      return next(new CustomError("Course Type not found.", 404));
    }

    res
      .status(200)
      .json({
        message: "Course Type deleted successfully",
        deletedCourseType,
      });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

module.exports = {
  createCourseType,
  getAllCourseTypes,
  deleteCourseTypeById,
};
