const express = require('express');

const app = express();

const mongoose = require('mongoose');

const userrouter = require("./routes/user");

const expressValidator =  require("express-validator")








const dotenv = require('dotenv');
dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true
    })
    .then(() => console.log('DB Connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});



// parsing the user input 
app.use(express.json())
// for validation in email , password , username 
app.use(expressValidator())

app.use("/" , userrouter)

const port =  8080;

app.listen(port, () => {
    console.log(`A Node Js API is listening on port: ${port}`);
});


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQwMzRkMTNlMTcxZWNkZWI5YmQ0MTMiLCJrZXkiOiIxMjMiLCJpYXQiOjE2MzE2MDEyNzV9.9cAeFGvAf8PNaNY4wXmlrVSOTZk4U-nPd9tK-8cAqf8


