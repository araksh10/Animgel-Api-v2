const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URI);
        console.log("Database Connected");
    } catch (error) {
        console.error("Database Connection error: ", error.message);
    }    
};

module.exports = connectDB;