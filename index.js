require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const CustomError = require('./utils/customError');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use((err, req, res, next) => {
  logsFunction.error(`${req.method} ${req.url} - ${new Date().toISOString()} - Error: ${err.message}`);
  if (err instanceof CustomError) {
      res.status(err.statusCode).json({ message: err.message });
  } else {
      res.status(500).json({ message: 'Internal server error' });
  }
});

//connect with mongodb
mongoose.connect(process.env.DB_URL)
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
            app.listen(process.env.PORT || PORT, () => {
                console.log(`started with URL: http://localhost:${process.env.PORT || PORT}/`);
            })
        } catch (error) {
            logsFunction.error(` ${new Date().toISOString()} - Error: ${error.message}`);
            console.error('Error during database initialization:', error);
            process.exit(1);
        }
    })
    .catch(error => {
        logsFunction.error(` ${new Date().toISOString()} - Error: ${error.message}`);
        console.error('Database connection error:', error);
        process.exit(1);
    });