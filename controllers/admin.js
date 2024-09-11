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

exports.editAdmin = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, body, {
      new: true,
    });
    if (!user) {
      return next(new CustomError("Admin not found.", 404));
    }

    res.status(200).send({ message: "Updated successfully", user });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return next(new CustomError("Admin not found.", 404));
    }
    res.status(200).send({ message: "Deleted successfully", user });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};
