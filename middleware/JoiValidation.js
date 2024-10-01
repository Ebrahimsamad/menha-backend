const CustomError = require("../utils/customError");

module.exports = (schema) => async (req, res, next) => {
  try {
    let bodyValidation = { ...req.body };

    if (req.files && req.files["image"]) {
      bodyValidation = {
        ...bodyValidation,
        image: {
          buffer: req.files["image"][0].buffer,
          mimetype: req.files["image"][0].mimetype,
        },
      };
    }
    if (req.files && req.files["militaryStatusImage"]) {
      bodyValidation = {
        ...bodyValidation,
        militaryStatusImage: {
          buffer: req.files["militaryStatusImage"][0].buffer,
          mimetype: req.files["militaryStatusImage"][0].mimetype,
        },
      };
    }
    if (req.files && req.files["IDImage"]) {
      bodyValidation = {
        ...bodyValidation,
        IDImage: {
          buffer: req.files["IDImage"][0].buffer,
          mimetype: req.files["IDImage"][0].mimetype,
        },
      };
    }
    if (req.files && req.files["graduationImage"]) {
      bodyValidation = {
        ...bodyValidation,
        graduationImage: {
          buffer: req.files["graduationImage"][0].buffer,
          mimetype: req.files["graduationImage"][0].mimetype,
        },
      };
    }

    await schema.validateAsync(bodyValidation, { abortEarly: false });
    next();
  } catch (err) {
    const messages = err.details.map((detail) => detail.message).join(", ");
    return next(new CustomError(messages, 400));
  }
};
