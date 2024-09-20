const Joi = require("joi");
const mongoose = require("mongoose");

const objectIdValidation = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const createScholarshipValidation = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title must be a string.",
    "string.empty": "Title is required.",
    "any.required": "Scholarship title is required.",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description must be a string.",
    "string.empty": "Description is required.",
    "any.required": "Scholarship description is required.",
  }),
  fieldOfStudyId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .required()
    .messages({
      "any.invalid": "Invalid Field of Study ID.",
      "string.empty": "Field of Study ID is required.",
      "any.required": "Field of Study is required.",
    }),
  courseTypeId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .required()
    .messages({
      "any.invalid": "Invalid Course Type ID.",
      "string.empty": "Course Type ID is required.",
      "any.required": "Course Type is required.",
    }),
  duration: Joi.string().required().messages({
    "string.base": "Duration must be a string.",
    "string.empty": "Duration is required.",
    "any.required": "Scholarship duration is required.",
  }),
  modeOfStudyId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .required()
    .messages({
      "any.invalid": "Invalid Mode of Study ID.",
      "string.empty": "Mode of Study ID is required.",
      "any.required": "Mode of Study is required.",
    }),
  country: Joi.string().required().messages({
    "string.base": "Country must be a string.",
    "string.empty": "Country is required.",
    "any.required": "Scholarship country is required.",
  }),
  isWinter: Joi.boolean().optional().default(false).messages({
    "boolean.base": "isWinter must be a boolean value.",
  }),
  isFree: Joi.boolean().optional().default(false).messages({
    "boolean.base": "isFree must be a boolean value.",
  }),
  isFullTime: Joi.boolean().optional().default(false).messages({
    "boolean.base": "isFullTime must be a boolean value.",
  }),
  gpa: Joi.number().min(0).max(4).required().messages({
    "number.base": "GPA must be a number.",
    "number.min": "GPA must be at least 0.",
    "number.max": "GPA must be at most 4.",
    "any.required": "GPA is required.",
  }),
  universityId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .required()
    .messages({
      "any.invalid": "Invalid University ID.",
      "string.empty": "University ID is required.",
      "any.required": "University is required.",
    }),
  languageId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .required()
    .messages({
      "any.invalid": "Invalid Language ID.",
      "string.empty": "Language ID is required.",
      "any.required": "Language is required.",
    }),
});

const editScholarshipValidation = Joi.object({
  title: Joi.string().optional().messages({
    "string.base": "Title must be a string.",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description must be a string.",
  }),
  fieldOfStudyId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .optional()
    .messages({
      "any.invalid": "Invalid Field of Study ID.",
    }),
  courseTypeId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .optional()
    .messages({
      "any.invalid": "Invalid Course Type ID.",
    }),
  duration: Joi.string().optional().messages({
    "string.base": "Duration must be a string.",
  }),
  modeOfStudyId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .optional()
    .messages({
      "any.invalid": "Invalid Mode of Study ID.",
    }),
  country: Joi.string().optional().messages({
    "string.base": "Country must be a string.",
  }),
  isWinter: Joi.boolean().optional().messages({
    "boolean.base": "isWinter must be a boolean value.",
  }),
  isFree: Joi.boolean().optional().messages({
    "boolean.base": "isFree must be a boolean value.",
  }),
  isFullTime: Joi.boolean().optional().messages({
    "boolean.base": "isFullTime must be a boolean value.",
  }),
  gpa: Joi.number().min(0).max(4).optional().messages({
    "number.base": "GPA must be a number.",
    "number.min": "GPA must be at least 0.",
    "number.max": "GPA must be at most 4.",
  }),
  universityId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .optional()
    .messages({
      "any.invalid": "Invalid University ID.",
    }),
  languageId: Joi.string()
    .custom(objectIdValidation, "ObjectId validation")
    .optional()
    .messages({
      "any.invalid": "Invalid Language ID.",
    }),
});

module.exports = {
  createScholarshipValidation,
  editScholarshipValidation,
};
