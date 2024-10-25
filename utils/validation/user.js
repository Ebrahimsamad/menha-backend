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
  password: Joi.string()
    .min(8)
    .required()
    .pattern(/^[A-Za-z\d]{8,128}$/)
    .messages({
      "string.base": "Password must be a string.",
      "string.pattern.base": "Password must contain only letters and numbers.",
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
      "binary.base": "Image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Image type must be a string",
        "string.pattern.base": "Invalid image type",
      }),
  })
    .messages({
      "object.base": "Image must be an object",
    }),
});

const loginUser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must be a string.",
    "string.empty": "Password is required.",
    "any.required": "Password is required.",
  }),
});
const updateProfile = Joi.object({
  userName: Joi.string()
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
  currentPassword: Joi.string().required().messages({
    "string.base": "current password must be a string.",
    "string.empty": "current password is required.",
    "any.required": "current password is required.",
  }),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(/^[A-Za-z\d]{8,128}$/)
    .messages({
      "string.base": "Password must be a string.",
      "string.pattern.base": "Password must contain only letters and numbers.",
      "string.min": "Password must be at least 8 characters long.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "confirm passwords must match. with new password",
    "any.required": "Confirm Password is required.",
  }),
});

const forgetPasswordUser = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
});

const resetPasswordCheckTokenValidation = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "rest token is required.",
    "any.required": "rest token is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
});

const resetPasswordUser = Joi.object({
  token: Joi.string().required().messages({
    "string.empty": "rest token is required.",
    "any.required": "rest token is required.",
  }),
  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string.",
    "string.email": "Email must be a valid email address.",
    "string.empty": "Email is required.",
    "any.required": "Email is required.",
  }),
  newPassword: Joi.string()
    .min(8)
    .required()
    .pattern(/^[A-Za-z\d]{8,128}$/)
    .messages({
      "string.base": "Password must be a string.",
      "string.pattern.base": "Password must contain only letters and numbers.",
      "string.min": "Password must be at least 8 characters long.",
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),

  confirmPassword: Joi.any().valid(Joi.ref("newPassword")).required().messages({
    "any.only": "confirm password must match, with new password",
    "any.required": "Confirm Password is required.",
  }),
});

module.exports = {
  createUser,
  loginUser,
  changePassword,
  updateProfile,
  forgetPasswordUser,
  resetPasswordUser,
  resetPasswordCheckTokenValidation,
};
