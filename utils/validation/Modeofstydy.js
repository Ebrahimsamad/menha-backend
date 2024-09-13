const Joi = require('joi');

const modeofstudyvaldate = (data) => {
    const schema = Joi.object({
        modeOfStudy: Joi.string()
            .regex(/^[A-Z]/)  
            .required()       
            .messages({
                'string.pattern.base': 'Mode of study must start with a capital letter.',
                'any.required': 'Mode of study is required.',
                'string.empty': 'Mode of study cannot be empty.'
            })
    });

    return schema.validate(data);
};

module.exports ={modeofstudyvaldate};

