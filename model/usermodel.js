const mongoose = require("mongoose");

const userschema = mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email_phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const user = mongoose.model("User", userschema);

module.exports = user;
