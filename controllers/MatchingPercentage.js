const MatchingPercentage = require("../models/portfolioMatchingWithScholarships");
const CustomError = require("../utils/customError");

exports.getUserMatchingPercentage = async (req, res, next) => {
    try {
        const user = req.user;
        const currentDate = new Date();
        const userBuydate = new Date(user.expBuyPortfolio);
        if(userBuydate < currentDate){
            return next(new CustomError("Portfolio Expired", 401));
        }
        const matchingPercentage = await MatchingPercentage.findOne({ userId: user.id })
            .populate('matchingPercentage.scholarshipId'); 

        if (!matchingPercentage) {
            return next(new CustomError("Matching Percentage not found", 404));
        }

        res.status(200).send({ message: "Your Matching Percentage", matchingPercentage });
    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};
