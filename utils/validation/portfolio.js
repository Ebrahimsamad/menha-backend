const Joi = require('joi');

const portfolioValidationSchema = Joi.object({
  levelOfStudy: Joi.string().pattern(/^[A-Z][a-zA-Z\s]*$/).required().messages({
    'string.base': 'Level of study must be a string.',
    'string.empty': 'Level of study is required.',
    'string.pattern.base': 'Level of study must start with a capital letter.',
    'any.required': 'Level of study is required.',
  }),
  phone: Joi.string().required().pattern(/^(010|011|012|015)[0-9]{8}$/).messages({
    'string.base': 'Phone number must be a string.',
    'string.pattern.base': 'Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015 and followed by 8 digits.',
    'string.empty': 'Phone number is required.',
    'any.required': 'Phone number is required.',
  }),
  fieldOfStudyId: Joi.string().required().messages({
    'string.base': 'Field of study must be a string.',
    'string.empty': 'Field of study is required.',
    'any.required': 'Field of study is required.',
  }),
  courseTypeId: Joi.string().required().messages({
    'string.base': 'Course type must be a string.',
    'string.empty': 'Course type is required.',
    'any.required': 'Course type is required.',
  }),
  
  modeOfStudyId: Joi.string().required().messages({
    'string.base': 'Mode of study must be a string.',
    'string.empty': 'Mode of study is required.',
    'any.required': 'Mode of study is required.',
  }),
  isWinter: Joi.boolean().messages({
    'boolean.base': 'Is Winter must be a boolean.',
  }),
  isFree: Joi.boolean().messages({
    'boolean.base': 'Is Free must be a boolean.',
  }),
  isFullTime: Joi.boolean().messages({
    'boolean.base': 'Is Full Time must be a boolean.',
  }),
  gpa: Joi.number().required().min(1).max(5).messages({
    'number.base': 'GPA must be a number.',
    'number.min': 'GPA must be at least 1.',
    'number.max': 'GPA must be at most 5.',
    'any.required': 'GPA is required.',
  }),

  languageId: Joi.string().required().messages({
    'string.base': 'Language must be a string.',
    'string.empty': 'Language is required.',
    'any.required': 'Language is required.',
  }),
  militaryStatusImage: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Military status image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Military status image type must be a string",
        "string.pattern.base": "Invalid military status image type",
      }),
  })
    .required()
    .messages({
      "any.required": "Military status image is required.",
      "object.base": "Military status image must be an object",
    }),

  IDImage: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "ID image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "ID image type must be a string",
        "string.pattern.base": "Invalid ID image type",
      }),
  })
    .required()
    .messages({
      "any.required": "ID image is required.",
      "object.base": "ID image must be an object",
    }),

  graduationImage: Joi.object({
    buffer: Joi.binary().messages({
      "binary.base": "Graduation image file data must be provided",
    }),
    mimetype: Joi.string()
      .regex(/^image\//)
      .messages({
        "string.base": "Graduation image type must be a string",
        "string.pattern.base": "Invalid graduation image type",
      }),
  })
    .required()
    .messages({
      "any.required": "Graduation image is required.",
      "object.base": "Graduation image must be an object",
    }),
  dateOfBirthDate: Joi.date().required().messages({
    'date.base': 'Date of birth must be a valid date.',
    'any.required': 'Date of birth is required.',
  }),
  
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'string.base': 'Gender must be a string.',
    'any.only': 'Gender must be one of "male", "female", or "other".',
    'any.required': 'Gender is required.',
  }),
  
});

const updatePortfolioValidation=Joi.object({
  levelOfStudy: Joi.string().pattern(/^[A-Z][a-zA-Z\s]*$/).messages({
    'string.base': 'Level of study must be a string.',
    'string.empty': 'Level of study is required.',
    'string.pattern.base': 'Level of study must start with a capital letter.',
  }),
  phone: Joi.string().pattern(/^(010|011|012|015)[0-9]{8}$/).messages({
    'string.base': 'Phone number must be a string.',
    'string.pattern.base': 'Phone number must be a valid Egyptian number starting with 010, 011, 012, or 015 and followed by 8 digits.',
    'string.empty': 'Phone number is required.',
  }),
  fieldOfStudyId: Joi.string().messages({
    'string.base': 'Field of study must be a string.',
    'string.empty': 'Field of study is required.',
  }),
  courseTypeId: Joi.string().messages({
    'string.base': 'Course type must be a string.',
    'string.empty': 'Course type is required.',
  }),
  
  modeOfStudyId: Joi.string().messages({
    'string.base': 'Mode of study must be a string.',
    'string.empty': 'Mode of study is required.',
  }),
  isWinter: Joi.boolean().messages({
    'boolean.base': 'Is Winter must be a boolean.',
  }),
  isFree: Joi.boolean().messages({
    'boolean.base': 'Is Free must be a boolean.',
  }),
  isFullTime: Joi.boolean().messages({
    'boolean.base': 'Is Full Time must be a boolean.',
  }),
  gpa: Joi.number().min(1).max(5).messages({
    'number.base': 'GPA must be a number.',
    'number.min': 'GPA must be at least 1.',
    'number.max': 'GPA must be at most 5.',
  }),
  languageId: Joi.string().messages({
    'string.base': 'Language must be a string.',
    'string.empty': 'Language is required.',
  }),
  militaryStatusImage: Joi.object({
    buffer: Joi.binary().messages({
      'binary.base': 'Military status image file data must be provided',
    }),
    mimetype: Joi.string().regex(/^image\//).messages({
      'string.base': 'Military status image type must be a string',
      'string.pattern.base': 'Invalid military status image type',
    }),
  }).messages({
    'object.base': 'Military status image must be an object',
  }),

  IDImage: Joi.object({
    buffer: Joi.binary().messages({
      'binary.base': 'ID image file data must be provided',
    }),
    mimetype: Joi.string().regex(/^image\//).messages({
      'string.base': 'ID image type must be a string',
      'string.pattern.base': 'Invalid ID image type',
    }),
  }).messages({
    'object.base': 'ID image must be an object',
  }),

  graduationImage: Joi.object({
    buffer: Joi.binary().messages({
      'binary.base': 'Graduation image file data must be provided',
    }),
    mimetype: Joi.string().regex(/^image\//).messages({
      'string.base': 'Graduation image type must be a string',
      'string.pattern.base': 'Invalid graduation image type',
    }),
  }).messages({
    'object.base': 'Graduation image must be an object',
  }),
  dateOfBirthDate: Joi.date().messages({
    'date.base': 'Date of birth must be a valid date.',
  }),
  gender: Joi.string().valid('male', 'female', 'other').messages({
    'string.base': 'Gender must be a string.',
    'any.only': 'Gender must be one of "male", "female", or "other".',
  }),
 
});
module.exports = {portfolioValidationSchema,updatePortfolioValidation};
