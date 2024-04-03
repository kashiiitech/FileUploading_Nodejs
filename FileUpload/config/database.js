const mongoose = require("mongoose");
require("dotenv").config();


const connectDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => { console.log("DB connection established successfully....")})
    .catch((err) => {
        console.error(err);
        console.log("Error while connecting with the Database");
        process.exit(1);
    })
};


module.exports = connectDB;