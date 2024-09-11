const Joi = require("joi");

const createAdminValidation = Joi.object({
    userName: Joi.string()
        .required()
        .messages({
            "string.base": "userName must be a string.",
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
        .messages({
            "string.base": "Password must be a string.",
            "string.min": "Password must be at least 8 characters long.",
            "string.empty": "Password is required.",
            "any.required": "Password is required.",
        }),
    confirmPassword: Joi.any().valid(Joi.ref("password")).required().messages({
        "any.only": "Confirm password must match password.",
        "any.required": "Confirm Password is required.",
    }),
});
const updateAdminValidation = Joi.object({
    userName: Joi.string().messages({
        "string.base": "userName must be a string.",
    }),
    email: Joi.string().email().messages({
        "string.base": "Email must be a string.",
        "string.email": "Email must be a valid email address.",
        
    }),
    password: Joi.string().min(8)
        .messages({
            "string.base": "Password must be a string.",
           
            "string.min": "Password must be at least 8 characters long.",
           
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
            is: Joi.exist(),
            then: Joi.required(),
            otherwise: Joi.forbidden()
        })
        .messages({
            "any.only": "Confirm password must match password.",
            "any.required": "Confirm Password is required.",
            "any.unknown": "Confirm Password should not be provided if Password is not provided."
        }),
});
module.exports = {
    createAdminValidation,
    updateAdminValidation
}