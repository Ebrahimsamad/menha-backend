const Joi = require("joi");

const createUser = Joi.object({
  userName: Joi.string()
      .required()
      .pattern(/^[a-zA-Z\s]+$/)
      .messages({
          "string.base": "userName must be a string.",
          "string.pattern.base":
              "userName must only contain alphabetic characters and spaces.",
          "string.empty": "userName is required.",
          "any.required": "userName is required.",
      }),
  email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
  }),
  password: Joi.string().min(8).required()
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/)
      .messages({
          "string.base": "Password must be a string.",
          "string.pattern.base":
              "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?).",
          "string.min": "Password must be at least 8 characters long.",
          "string.empty": "Password is required.",
          "any.required": "Password is required.",
      }),
  confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
      "any.only": "confirm passwords must match, with password",
      "any.required": "Confirm Password is required.",
  }),
  image: Joi.object({
      buffer: Joi.binary().messages({
          'binary.base': 'Image file data must be provided',

      }),
      mimetype: Joi.string().regex(/^image\//).messages({
          'string.base': 'Image type must be a string',
          'string.pattern.base': 'Invalid image type',

      }),

  }).required()
      .messages({
          "any.required": "Image is required.",
          'object.base': 'Image must be an object',

      })
});

const loginUser = Joi.object({
  email: Joi.string().email().required().messages({
      "string.base": "Email must be a string.",
      "string.email": "Email must be a valid email address.",
      "string.empty": "Email is required.",
      "any.required": "Email is required.",
  }),
  password: Joi.string().required()
      .messages({
          "string.base": "Password must be a string.",
          "string.empty": "Password is required.",
          "any.required": "Password is required.",
      }),
}); 
const updateProfile = Joi.object({
  userName: Joi.string()
    .required()
    .pattern(/^[a-zA-Z\s]+$/)
    .messages({
      "string.base": "userName must be a string.",
      "string.pattern.base":
        "userName must only contain alphabetic characters and spaces.",
      "string.empty": "userName is required.",
      "any.required": "userName is required.",
    }),
  image: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Image type must be a string",
        "string.pattern.base": "Invalid image type",
      }),
  }).messages({
    "object.base": "Image must be an object",
  }),
});
const changePassword = Joi.object({
  currentPassword: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/
    )
    .messages({
      "string.base": "current password must be a string.",
      "string.pattern.base":
        "current password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?).",
      "string.min": "current password must be at least 8 characters long.",
      "string.empty": "current password is required.",
      "any.required": "current password is required.",
    }),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/
    )
    .messages({
      "string.base": "new password must be a string.",
      "string.pattern.base":
        "new password must contain at least one uppercase letter, one lowercase letter, one number, and one special character(@$!%*?).",
      "string.min": "new password must be at least 8 characters long.",
      "string.empty": "new password is required.",
      "any.required": "new password is required.",
    }),
  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "confirm passwords must match. with new password",
    "any.required": "Confirm Password is required.",
  }),
});

module.exports = {
  createUser,
    loginUser,
  changePassword,
  updateProfile,

};
