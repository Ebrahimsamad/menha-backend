const jwtSign = util.promisify(jwt.sign);
const User = require("../models/user");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");
const jwt = require('jsonwebtoken');


exports.signup = async (req, res, next) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(new CustomError("Email is already used.", 409));
    }

    const user = new User({ userName, email, password ,image:req.body.image });
    await user.save();

    res.status(201).send({ message: "User created", user });
  } catch (error) {
    next(new CustomError("Internal server error.", 500));
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new CustomError("Invalid email or password", 401));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (isMatched) {
      const token = await jwtSign(
        { userId: user._id },
        process.env.JWT_SECRET_ACCESS_TOKEN,
        {
          expiresIn: "30d",
        }
      );

      res.status(200).send({ message: "User logged in", token, user });
    } else {
      return next(new CustomError("Invalid email or password", 401));
    }
  } catch (error) {
    console.log(error);
    next(new CustomError("Internal server error", 500));
  }
};


exports.updateProfileUser = async (req, res, next) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { userName: req.body.userName, image: req.body.image },
        { new: true }
      );
      if (!user) {
        return next(new CustomError("User not found.", 404));
      }
  
      res.status(200).send({ message: "Profile updated successfully", user });/create
    } catch (error) {
      next(new CustomError("Internal server error.", 500));
    }
  };
  exports.changeUserPassword = async (req, res, next) => {
    let { currentPassword, newPassword } = req.body;
  
    try {
      const user = req.user;
  
      const isMatched = await bcrypt.compare(currentPassword, user.password);
  
      if (isMatched) {
        user.password = newPassword;
      } else {
        return next(new CustomError("Current password is wrong", 401));
      }
  
      await user.save()
  
      res.status(200).send({ message: "password updated successfully", user });
    } catch (error) {
      next(new CustomError(error.message, 500));
    }
  };