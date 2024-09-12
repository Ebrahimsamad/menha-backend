const jwtSign = util.promisify(jwt.sign);
const User = require("../models/user");
const bcrypt = require("bcrypt");
const CustomError = require("../utils/customError");
const jwt = require('jsonwebtoken');
const transporter = require("../utils/nodemialer");
const crypto = require("crypto");


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

  exports.forgetPassword = async (req, res, next) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return next(new CustomError("User not found.", 404));
      }
  
      const resetToken = crypto.randomBytes(3).toString("hex");
      const resetTokenExpiration = Date.now() + 3600000;
      user.resetToken = resetToken
      user.resetTokenExpiration = resetTokenExpiration
  
      await user.save();
  
      const mailOptions = {
        from: `Menha <${process.env.NODEMAILER_EMAIL}>`,
        to: user.email,
        subject: "Password Reset",
        text: `This is your reset token: ${resetToken}`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).send({ message: "Password reset email sent." });
  
    } catch (error) {
        console.log(error)
      next(new CustomError(error.message, 500));
    }
  };
  exports.resetPassword = async (req, res, next) => {
    const { token, email, newPassword } = req.body;
  
    try {
  
      const user = await User.findOne({
        email,
        resetToken: token,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return next(new CustomError("rest token wrong or expirat or User not found.", 404));
      }
  
      user.password = newPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();
  
      res.status(200).send({ message: "Password reset successfully" });
    } catch (error) {
      next(new CustomError("Internal server error.", 500));
    }
  };