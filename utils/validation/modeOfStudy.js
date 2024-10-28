const Joi = require("joi");

const modeofstudyvaldate = Joi.object({
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

module.exports = {
  modeofstudyvaldate,
};
