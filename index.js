require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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
