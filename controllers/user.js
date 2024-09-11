const User = require("../models/user");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");


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