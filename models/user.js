const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    userName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://ik.imagekit.io/2crfufcjy/static/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtaWNvbjQtamlyMjA2NC1wb3ItbC5qcGc.jpg?updatedAt=1726790573220",
    },
    isAdmin: {
      type: Boolean,
      default: "false",
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiration: {
      type: Date,
    },
    savedScholarshipIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scholarship",
        default: [],
      },
    ],
    isBuyPortfolio:{
      type: Boolean,
      default: false,
    },
    expBuyPortfolio:{
      type:Date,
    },
    isGetFreePlan:{
      type: Boolean,
      default: false,
    },
    selectedPlan:{
      type:String,
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model("User", userSchema);

module.exports = User;
