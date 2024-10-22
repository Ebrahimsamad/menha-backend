const { model, Schema } = require("mongoose");

const MatchingPercentageSchema = new Schema(
  {
    portfolioId: {
      type: Schema.Types.ObjectId,
      ref: "Portfolio",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    matchingPercentage: [
      {
        scholarshipId: {
          type: Schema.Types.ObjectId,
          ref: "Scholarship", 
          required: true,
        },
        percentage: {
          type: Number,
          required: true,
          min: 0,
          max: 100, 
        },
      },
    ],
  },
  {
    timestamps: true, 
  }
);

const MatchingPercentage = model("MatchingPercentage", MatchingPercentageSchema);

module.exports = MatchingPercentage;
