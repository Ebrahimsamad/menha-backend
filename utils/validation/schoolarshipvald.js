const Joi = require("joi");

const objectId = Joi.string()
  .regex(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Invalid ID format",
  });

const scholarshipValidationSchema = Joi.object({
  title: Joi.string().trim().min(5).max(100).required().messages({
    "string.empty": "Title cannot be empty",
    "string.min": "Title should have at least 5 characters",
    "string.max": "Title should not exceed 100 characters",
    "any.required": "Title is required",
  }),
  description: Joi.string().trim().min(10).required().messages({
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters long",
    "any.required": "Description is required",
  }),
  fieldOfStudyId: objectId.required().messages({
    "any.required": "Field of Study ID is required",
  }),
  courseTypeId: objectId.required().messages({
    "any.required": "Course Type ID is required",
  }),
  duration: Joi.string()
    .pattern(/^[0-9]+ (months|years)$/)
    .required()
    .messages({
      "string.pattern.base":
        'Duration should be in the format of "X months" or "X years"',
      "any.required": "Duration is required",
    }),
  modeOfStudyId: objectId.required().messages({
    "any.required": "Mode of Study ID is required",
  }),
  country: Joi.string()
    .valid("USA", "Canada", "UK", "Germany", "France")
    .required()
    .messages({
      "any.only": "Country must be one of [USA, Canada, UK, Germany, France]",
      "any.required": "Country is required",
    }),
  isWinter: Joi.boolean().default(false).messages({
    "boolean.base": "isWinter should be a boolean value",
  }),
  isFree: Joi.boolean().default(false).messages({
    "boolean.base": "isFree should be a boolean value",
  }),
  isFullTime: Joi.boolean().default(false).messages({
    "boolean.base": "isFullTime should be a boolean value",
  }),
  gpa: Joi.number().min(0).max(4).precision(2).required().messages({
    "number.base": "GPA must be a number",
    "number.min": "GPA must be at least 0",
    "number.max": "GPA must not exceed 4",
    "any.required": "GPA is required",
  }),
  universityId: objectId.required().messages({
    "any.required": "University ID is required",
  }),
  languageId: objectId.required().messages({
    "any.required": "Language ID is required",
  }),
});

module.exports = { scholarshipValidationSchema };
