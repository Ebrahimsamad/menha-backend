const Joi = require('joi');

const languageValidationSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            'string.base': 'Name should be a type of string',
            'string.empty': 'Name cannot be an empty field',
            'string.min': 'Name should have a minimum length of {#limit}',
            'string.max': 'Name should have a maximum length of {#limit}',
            'any.required': 'Name is a required field'
        }),
    course: Joi.array()
        .items(Joi.string().min(1))
        .min(1)
        .required()
        .messages({
            'array.base': 'Course should be an array',
            'array.empty': 'Course array cannot be empty',
            'array.min': 'Course should have at least one item',
            'any.required': 'Course is a required field'
        })
});

module.exports = {languageValidationSchema  };
// const validateLanguage = (req, res, next) => {
//     const { error } = languageValidationSchema.validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);
//     next();
// };

// module.exports = validateLanguage;
