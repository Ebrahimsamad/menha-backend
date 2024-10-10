const Portfolio = require("../models/portfolio");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user");
const transporter = require("../utils/nodemialer");
const CustomError = require("../utils/customError");

// CREATE a portfolio
exports.createPortfolio = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user.isBuyPortfolio) {
      return next(new CustomError("User must Buy portfolio", 400));
    }
    const userportfolio = await Portfolio.find({ userID: user.id });
    if (userportfolio.length !== 0) {
      return next(new CustomError("User have portfolio", 400));
    }
    const portfolioData = { ...req.body, userID: user.id };
    const portfolio = new Portfolio(portfolioData);
    const savedPortfolio = await portfolio.save();
    res
      .status(201)
      .send({ message: "protfolio created", portfolio: savedPortfolio });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// READ all portfolios
exports.getAllPortfolios = async (req, res, next) => {
  const { isAccept, isReject } = req.query;

  try {
    let query = {};
    if (isAccept) {
      query.isAccept = isAccept === "true";
    }
    if (isReject) {
      query.isReject = isReject === "true";
    }

    const portfolios = await Portfolio.find(query)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("languageId")
      .populate("userID");

    res.status(200).send({ message: "All portfolio", portfolios });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// READ a single portfolio by ID
exports.getPortfolioById = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("languageId")
      .populate("userID");
    if (!portfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }
    res.status(200).send({ message: "portfolio match your id", portfolio });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
exports.getUserProfile = async (req, res, next) => {
  const userId = req.user._id.toString();
  console.log(userId);
  try {
    const portfolio = await Portfolio.find({ userID: userId })
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("languageId")
      .populate("userID");
    if (!portfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }
    res.status(200).send({ message: "your portfolio", portfolio });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// UPDATE a portfolio
exports.updatePortfolio = async (req, res, next) => {
  const user = req.user;

  try {
    const portfolio = await Portfolio.findById(req.params.id)
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("languageId")
      .populate("userID");

    if (!portfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }

    if (portfolio.userID.id.toString() !== user._id.toString()) {
      return next(
        new CustomError("You are not authorized to update this portfolio", 403)
      );
    }

    const updateData = { ...req.body, isAccept: false, isReject: false };

    const updatedPortfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )
      .populate("fieldOfStudyId")
      .populate("courseTypeId")
      .populate("modeOfStudyId")
      .populate("languageId")
      .populate("userID");

    res
      .status(200)
      .send({
        message: "your portfolio updated successfully",
        updatedPortfolio,
      });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

// DELETE a portfolio
exports.deletePortfolio = async (req, res, next) => {
  try {
    const deletedPortfolio = await Portfolio.findByIdAndDelete(req.params.id);
    if (!deletedPortfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }
    res.status(200).json({ message: "Portfolio deleted successfully" });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
exports.getFreePlan = async (req, res, next) => {
  try {
    const user = req.user;
    // if (user.isGetFreePlan)
    //   return next(
    //     new CustomError("You have already benefited from the offer", 400)
    //   );
    let currentDate = new Date();
    let expDate = new Date(currentDate);
    expDate.setMonth(currentDate.getMonth() + 1);
    const newUser = await User.findByIdAndUpdate(
      user.id,
      { isBuyPortfolio: true, expBuyPortfolio: expDate, isGetFreePlan: true },
      { new: true }
    );
    res.status(200).send({ message: "Success", newUser });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.buyPortfolio = async (req, res, next) => {
  const { date, price } = req.body;
  const portfolioData = {
    price_data: {
      currency: "usd",
      product_data: {
        name: `Portfolio ${req.user.userName} (${date})`,
      },
      unit_amount: price *100,
    },
    quantity: 1,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [portfolioData],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/portfolio/complete?session_id={CHECKOUT_SESSION_ID}&&id=${req.user.id}&&date=${date}`,
      cancel_url: `${process.env.BASE_URL}/portfolio/cancel`,
    });
    res.json({ url: session.url});
    } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
exports.completePayment = async (req, res, next) => {
  const userID = req.query.id;
  const date = req.query.date;
  let currentDate = new Date();
  let expDate = new Date(currentDate);
  if (date === "1 month") {
    expDate.setMonth(currentDate.getMonth() + 1);
  } else if (date === "3 month") {
    expDate.setMonth(currentDate.getMonth() + 3);
  } else if (date === "3 month") {
    expDate.setMonth(currentDate.getMonth() + 6);
  }
  const user = await User.findByIdAndUpdate(
    userID,
    { isBuyPortfolio: true, expBuyPortfolio: expDate },
    { new: true }
  );
  const session_id = req.query.session_id;

  try {
    res.render(
      `${process.env.SUCCESS_PAGE_URL}?isBuyPortfolio=${user.isBuyPortfolio}&&expBuyPortfolio=${expDate}`
    );
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
exports.cancel = (req, res) => {
  res.render(process.env.PRICING_PAGE_URL);
};

exports.acceptProtfolio = async (req, res, next) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { isAccept: true },
      { new: true }
    ).populate("userID");
    if (!portfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }
    const mailOptions = {
      from: `Men7a <${process.env.NODEMAILER_EMAIL}>`,
      to: portfolio.userID.email,
      subject: "Your Portfolio in Men7a",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                }
                .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                .header {
                  text-align: center;
                  padding-bottom: 20px;
                  background-color: #002b4c;
                  border-radius: 10px 10px 0 0;
                  color: #ffffff;
                }
                .header img {
                  max-width: 150px;
                  margin-bottom: 10px;
                }
                .header h1 {
                  font-size: 24px;
                  margin: 0;
                }
                .content {
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e0e0e0;
                  border-radius: 0 0 10px 10px;
                }
                .content p {
                  margin: 0 0 15px;
                  color: #8A690F;
                }
                .content strong {
                  color: #002b4c;
                }
                .content input{
                  width: 75%;
                  text-align: center;
                  padding: 10px;
                  border: 1px solid #002b4c;
                  border-radius: 5px;
                  margin-bottom: 20px;
                  background-color: #f4f4f4;
                  color: #333;
                  font-size: 16px;
                  cursor: not-allowed;
                }
                .content a {
                  width: 50%;
                  display: block;
                  background-color: #B92A3B;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 15px;
                  border-radius: 15px;
                  font-size: 16px;
                  text-align: center;
                  cursor: pointer;
                  margin-top: 15px;
                  margin-bottom: 20px;
                }
                .content a:hover {
                  background-color: #003366;
                }
               
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <img src="https://ik.imagekit.io/2crfufcjy/static/logo.png?updatedAt=1726792325081" alt="Logo">
                  <h1>Accept Your Portfolio</h1>
                </div>
                <div class="content">
                  <strong>Your portfolio accepted successfully</strong>
                  <a href="https://menha.vercel.app/profile">Show your portfolio</a>
                </div>
              </div>
            </body>
            </html>
            
            `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send({ message: "Portfolio accepted successfully", portfolio });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
exports.rejectPortfolio = async (req, res, next) => {
  try {
    const rejectMessage = req.body.rejectMessage;
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      { isReject: true },
      { new: true }
    ).populate("userID");
    if (!portfolio) {
      return next(new CustomError("Portfolio not found", 404));
    }
    const mailOptions = {
      from: `Men7a <${process.env.NODEMAILER_EMAIL}>`,
      to: portfolio.userID.email,
      subject: "Your Portfolio in Men7a",
      html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                }
                .email-container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
                }
                .header {
                  text-align: center;
                  padding-bottom: 20px;
                  background-color: #002b4c;
                  border-radius: 10px 10px 0 0;
                  color: #ffffff;
                }
                .header img {
                  max-width: 150px;
                  margin-bottom: 10px;
                }
                .header h1 {
                  font-size: 24px;
                  margin: 0;
                }
                .content {
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e0e0e0;
                  border-radius: 0 0 10px 10px;
                }
                .content p {
                  margin: 0 0 15px;
                  color: #8A690F;
                }
                .content strong {
                  color: #002b4c;
                }
                .content input{
                  width: 75%;
                  text-align: center;
                  padding: 10px;
                  border: 1px solid #002b4c;
                  border-radius: 5px;
                  margin-bottom: 20px;
                  background-color: #f4f4f4;
                  color: #333;
                  font-size: 16px;
                  cursor: not-allowed;
                }
                .content a {
                  width: 50%;
                  display: block;
                  background-color: #B92A3B;
                  color: #ffffff;
                  text-decoration: none;
                  padding: 10px 15px;
                  border-radius: 15px;
                  font-size: 16px;
                  text-align: center;
                  cursor: pointer;
                  margin-top: 15px;
                  margin-bottom: 20px;
                }
                .content a:hover {
                  background-color: #003366;
                }
               
              </style>
            </head>
            <body>
              <div class="email-container">
                <div class="header">
                  <img src="https://ik.imagekit.io/2crfufcjy/static/logo.png?updatedAt=1726792325081" alt="Logo">
                  <h1>Reject Your Portfolio</h1>
                </div>
                <div class="content">
                  <strong>sorry, your portfolio rejected</strong>
                  <p>because: ${rejectMessage} </p>
                  <a href="https://menha.vercel.app/profile">Show your portfolio</a>
                </div>
              </div>
            </body>
            </html>
            
            `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .send({ message: "Portfolio rejected successfully", portfolio });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
