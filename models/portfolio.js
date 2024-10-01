const { model, Schema } = require("mongoose");

const portfolioSchema = new Schema(
  {
    levelOfStudy: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    fieldOfStudyId: {
      type: Schema.Types.ObjectId,
      ref: "FieldOfStudy",
      required: true,
    },
    courseTypeId: {
      type: Schema.Types.ObjectId,
      ref: "CourseType",
      required: true,
    },
    modeOfStudyId: {
      type: Schema.Types.ObjectId,
      ref: "ModeOfStudy",
      required: true,
    },
    isWinter: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    isFullTime: {
      type: Boolean,
      default: false,
    },
    gpa: {
      type: Number,
      required: true,
    },
 
    languageId: {
      type: Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    militaryStatusImage: {
      type: String,
      required: false,
    },
    IDImage: {
      type: String,
      required: false,
    },
    graduationImage: {
      type: String,
      required: false,
    },
    dateOfBirthDate: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      required: true,
    },
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isAccept:{
      type: Boolean,
      default: false,
    },
    isReject:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.dateOfBirthDate;
      },
    },
  }
);

portfolioSchema.pre("save", function (next) {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirthDate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  this.age = age; 
  next();
});

const Portfolio = model("Portfolio", portfolioSchema);

module.exports = Portfolio;
