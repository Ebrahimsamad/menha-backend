const Joi = require("joi");
const createUniversityValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "any.required": "University name is required.",
  }),
  address: Joi.string().required().messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address is required.",
    "any.required": "University address is required.",
  }),
  image: Joi.object({
    buffer: Joi.binary().required().messages({
      "binary.base": "Image file data must be provided.",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .required()
      .messages({
        "string.base": "Image type must be a string.",
        "string.pattern.base": "Invalid image type. Only images are allowed.",
      }),
  })
    .required()
    .messages({
      "any.required": "Image is required.",
      "object.base": "Image must be an object.",
    }),
  faculityName: Joi.string().optional().messages({
    "string.base": "Faculty name must be a string.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.email":
        "Email must be a valid email address with .com or .net domain.",
      "string.empty": "Email is required.",
      "any.required": "University email is required.",
    }),
  phone: Joi.string()
    .pattern(/^(010|011|012|015)\d{8}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must start with 010, 011, 012, or 015 and be exactly 11 digits long.",
      "string.empty": "Phone number is required.",
      "any.required": "Phone number is required.",
    }),
  pageUrl: Joi.string().uri().optional().messages({
    "string.uri": "Page URL must be a valid URL.",
  }),
});

const editUniversityValidation = Joi.object({
  name: Joi.string().optional().messages({
    "string.base": "Name must be a string.",
  }),
  address: Joi.string().optional().messages({
    "string.base": "Address must be a string.",
  }),
  image: Joi.object({
    buffer: Joi.binary().optional().messages({
      "binary.base": "Image file data must be provided.",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .optional()
      .messages({
        "string.base": "Image type must be a string.",
        "string.pattern.base": "Invalid image type. Only images are allowed.",
      }),
  })
    .optional()
    .messages({
      "object.base": "Image must be an object.",
    }),
  faculityName: Joi.string().optional().messages({
    "string.base": "Faculty name must be a string.",
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional()
    .messages({
      "string.email":
        "Email must be a valid email address with .com or .net domain.",
    }),
  phone: Joi.string()
    .pattern(/^(010|011|012|015)\d{8}$/)
    .optional()
    .messages({
      "string.pattern.base":
        "Phone number must start with 010, 011, 012, or 015 and be exactly 11 digits long.",
    }),
  pageUrl: Joi.string().uri().optional().messages({
    "string.uri": "Page URL must be a valid URL.",
  }),
});

module.exports = {
  createUniversityValidation,
  editUniversityValidation,
};
