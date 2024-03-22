const mongoose = require("mongoose");
require('dotenv').config()


const dbconnect = async () => {
  try {
    await mongoose.connect(
    process.env.DB_URL      
    );
    console.log("db connected");
  } catch (error) {
    console.log(error, "db not connect");
  }
};


module.exports = dbconnect;
