// const Joi = require('joi');

// const scholarshipValidationSchema = Joi.object({
//     title: Joi.string()
//         .min(3)
//         .max(100)
//         .required()
//         .messages({
//             'string.base': 'Title should be a type of string',
//             'string.empty': 'Title cannot be an empty field',
//             'string.min': 'Title should have a minimum length of {#limit}',
//             'string.max': 'Title should have a maximum length of {#limit}',
//             'any.required': 'Title is a required field'
//         }),
//     description: Joi.string()
//         .min(10)
//         .max(500)
//         .required()
//         .messages({
//             'string.base': 'Description should be a type of string',
//             'string.empty': 'Description cannot be an empty field',
//             'string.min': 'Description should have a minimum length of {#limit}',
//             'string.max': 'Description should have a maximum length of {#limit}',
//             'any.required': 'Description is a required field'
//         }),
//     fieldOfStudyId: Joi.string()
//         .hex()
//         .length(24)
//         .required()
//         .messages({
//             'string.base': 'Field of Study ID should be a type of string',
//             'string.empty': 'Field of Study ID cannot be an empty field',
//             'string.hex': 'Field of Study ID must be a hexadecimal string',
//             'string.length': 'Field of Study ID must be 24 characters long',
//             'any.required': 'Field of Study ID is a required field'
//         }),
//     courseTypeId: Joi.string()
//         .hex()
//         .length(24)
//         .required()
//         .messages({
//             'string.base': 'Course Type ID should be a type of string',
//             'string.empty': 'Course Type ID cannot be an empty field',
//             'string.hex': 'Course Type ID must be a hexadecimal string',
//             'string.length': 'Course Type ID must be 24 characters long',
//             'any.required': 'Course Type ID is a required field'
//         }),
//     duration: Joi.string()
//         .min(1)
//         .required()
//         .messages({
//             'string.base': 'Duration should be a type of string',
//             'string.empty': 'Duration cannot be an empty field',
//             'string.min': 'Duration should have a minimum length of {#limit}',
//             'any.required': 'Duration is a required field'
//         }),
//     modeOfStudyId: Joi.string()
//         .hex()
//         .length(24)
//         .required()
//         .messages({
//             'string.base': 'Mode of Study ID should be a type of string',
//             'string.empty': 'Mode of Study ID cannot be an empty field',
//             'string.hex': 'Mode of Study ID must be a hexadecimal string',
//             'string.length': 'Mode of Study ID must be 24 characters long',
//             'any.required': 'Mode of Study ID is a required field'
//         }),
//     country: Joi.string()
//         .min(2)
//         .max(50)
//         .required()
//         .messages({
//             'string.base': 'Country should be a type of string',
//             'string.empty': 'Country cannot be an empty field',
//             'string.min': 'Country should have a minimum length of {#limit}',
//             'string.max': 'Country should have a maximum length of {#limit}',
//             'any.required': 'Country is a required field'
//         }),
//     isWinter: Joi.boolean()
//         .default(false),
//     isFree: Joi.boolean()
//         .default(false),
//     isFullTime: Joi.boolean()
//         .default(false),
//     gpa: Joi.number()
//         .min(0)
//         .max(4)
//         .required()
//         .messages({
//             'number.base': 'GPA should be a type of number',
//             'number.min': 'GPA must be at least {#limit}',
//             'number.max': 'GPA must be at most {#limit}',
//             'any.required': 'GPA is a required field'
//         }),
//     universityId: Joi.string()
//         .hex()
//         .length(24)
//         .required()
//         .messages({
//             'string.base': 'University ID should be a type of string',
//             'string.empty': 'University ID cannot be an empty field',
//             'string.hex': 'University ID must be a hexadecimal string',
//             'string.length': 'University ID must be 24 characters long',
//             'any.required': 'University ID is a required field'
//         }),
//     languageId: Joi.string()
//         .hex()
//         .length(24)
//         .required()
//         .messages({
//             'string.base': 'Language ID should be a type of string',
//             'string.empty': 'Language ID cannot be an empty field',
//             'string.hex': 'Language ID must be a hexadecimal string',
//             'string.length': 'Language ID must be 24 characters long',
//             'any.required': 'Language ID is a required field'
//         })
// });

// module.exports = { scholarshipValidationSchema };
