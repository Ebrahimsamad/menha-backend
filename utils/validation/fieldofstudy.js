const Joi = require('joi');

const createFieldOfStudyValidation = Joi.object({
    fieldOfStudy: Joi.string()
        .regex(/^[A-Z][a-zA-Z\s]*$/) 
        .required()
        .messages({
            'string.base': 'Field of Study must be a string.',
            'string.empty': 'Field of Study is required.',
            'string.pattern.base': 'Field of Study must start with a capital letter and contain only letters and spaces.',
            'any.required': 'Field of Study is required.'
        })
});

module.exports = {
    createFieldOfStudyValidation
    
};
