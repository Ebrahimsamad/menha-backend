const Joi = require("joi");

const createCourseTypeValidation = Joi.object({
  courseType: Joi.string()
    .regex(/^[A-Z][a-zA-Z\s]*$/)

    .required()
    .messages({
      "string.base": "Course Type must be a string.",
      "string.empty": "Course Type is required.",
      "string.pattern.base":
        "Course Type must start with a capital letter and contain only letters and spaces.",
      "any.required": "Course Type is required.",
    }),
});

module.exports = {
  createCourseTypeValidation,
};
