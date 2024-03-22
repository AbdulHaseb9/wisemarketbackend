const user = require("../model/usermodel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();

// Function for login
const userlogin = async (req, resp) => {
  const { email_phone, password } = req.body;
  if (email_phone && password) {
    const finduser = await user.findOne({ email_phone });
    if (finduser) {
      const comparepassword = await bcrypt.compare(password, finduser.password);
      if (comparepassword) {
        const token = jwt.sign({ id: finduser._id }, process.env.jwt_verify, {
          expiresIn: "3 days",
        });
        resp.json(token);
      } else {
        resp.status(404).json("Invalid Credentials");
      }
    } else {
      resp.json({ error: "user not Found" });
    }
  } else {
    resp.json("fill all fields properly");
  }
};

// Function for register
const userregister = async (req, resp) => {
  const { firstname, lastname, email_phone, password } = req.body;

  if (firstname && lastname && email_phone && password) {
    const alreadyexist = await user.findOne({ email_phone });
    if (alreadyexist) {
      return resp.status(402).json("Email Already Exist");
    } else {
      const hashpassword = await bcrypt.hash(
        password,
        process.env.bcrypt_secret
      );

      const data = new user({
        firstname,
        lastname,
        email_phone,
        password: hashpassword,
      });

      await data.save();

      resp.json("Successfully Register");
    }
  } else {
    resp.json("Please Fill all fields Properly");
  }
};

// Export multiple function
module.exports = {
  userlogin,
  userregister,
};
