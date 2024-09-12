const Joi = require('joi');
const { languageValidationSchema } = require('../utils/validation/validateLanguage');

const validateLanguage = (req, res, next) => {
    const { error } = languageValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message); 
    next(); 
};

module.exports = validateLanguage;
