require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
const logsMiddlewares = require("./middleware/winstonLogs");
const logsFunction = require("./utils/winstonLogs");
const CustomError = require("./utils/customError");
const userRoutes = require("./routes/user");
const languageRoutes = require("./routes/languge");
const fieldOfStudy = require("./routes/fieldOfStudy");
const User = require("./models/user");
const adminRoutes = require("./routes/admin");

const PORT = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use(logsMiddlewares);


app.use("/admin", adminRoutes);
app.use(userRoutes);
app.use("/languages",languageRoutes);
app.use("/fieldOfStudy",fieldOfStudy);


app.use((req, res, next) => {
  logsFunction.error(
    `${req.method} ${
      req.url
    } - ${new Date().toISOString()} - Error: 404 not found this req`
  );
  res.status(404).json({ message: `${req.url} not found` });
});

//error middleware
app.use((err, req, res, next) => {
  logsFunction.error(
    `${req.method} ${req.url} - ${new Date().toISOString()} - Error: ${
      err.message
    }`
  );
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

//connect with mongodb
mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    try {
      const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASS } = process.env;
      const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });
      if (!existingAdmin) {
        const admin = new User({
          userName: ADMIN_NAME,
          email: ADMIN_EMAIL,
          password: ADMIN_PASS,
          isAdmin: true,
        });
        await admin.save();
      }
        // app.listen(process.env.PORT || PORT, () => {
        //   console.log(
        //     `started with URL: http://localhost:${process.env.PORT || PORT}/`
        //   );
        // });
    } catch (error) {
      logsFunction.error(
        ` ${new Date().toISOString()} - Error: ${error.message}`
      );
      console.error("Error during database initialization:", error);
      process.exit(1);
    }
  })
  .catch((error) => {
    logsFunction.error(
      ` ${new Date().toISOString()} - Error: ${error.message}`
    );
    console.error("Database connection error:", error);
    process.exit(1);
  });

module.exports = app;
