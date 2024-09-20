const Joi = require("joi");

const modeofstudyvaldate = (data) => {
  const schema = Joi.object({
    modeOfStudy: Joi.string()
      .regex(/^[A-Z]/)
      .required()
      .valid("Offline", "Online", "Hybrid")
      .messages({
        "string.pattern.base":
          "Mode of study must start with a capital letter.",
        "any.required": "Mode of study is required.",
        "string.empty": "Mode of study cannot be empty.",
        "any.invalid":
          "Invalid mode of study. Please choose from Offline, Online, Hybrid.",
      }),
  });

  return schema.validate(data);
};

module.exports = { modeofstudyvaldate };
