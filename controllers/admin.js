const User = require("../models/user");
const CustomError = require("../utils/customError");

exports.creatAdmin = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("Email is already in use.", 409));
    }
    const user = new User({ userName, email, password, isAdmin: true });
    await user.save();
    res.status(201).send({ message: "Admin user created successfully", user });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getAllAdmin = async (req, res, next) => {
  try {
    const admins = await User.find({ isAdmin: true });
    res.status(200).send({ message: "All Admin", admins });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
