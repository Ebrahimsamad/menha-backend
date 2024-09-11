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

mongoose.connect(process.env.DB_URL)
    .then(async () => {

        try {
           
            app.listen(process.env.PORT || PORT, () => {
                console.log(`started with URL: http://localhost:${process.env.PORT || PORT}/`);
            })
        } catch (error) {
            
            console.error('Error during database initialization:', error);
            process.exit(1);
        }
    })
    .catch(error => {
       
        console.error('Database connection error:', error);
        process.exit(1);
    });
