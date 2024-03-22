const express = require("express");
const cors = require("cors");
const dbconnect = require("./config/db");
const user = require("./model/usermodel");
require("dotenv").config();
var jwt = require("jsonwebtoken");
require("dotenv").config();

// import multiple functions from product controller
const productcontrol = require("./controllers/productcontroller");

// import multiple functions from user controller
const usercontrol = require("./controllers/usercontroller");

const app = express();

dbconnect();

app.use(express.json());
app.use(cors());

app.get("/getdata", productcontrol.getproduct);

app.post("/collection", productcontrol.postproduct);

app.post("/register", usercontrol.userregister);

app.post("/login", usercontrol.userlogin);

app.get("/getuser/:token", async (req, resp) => {
  try {
    const { token } = req.params;

    if (!token) {
      return resp.json("error");
    }
    const decoded = jwt.verify(token, process.env.jwt_verify);

    if (decoded) {
      const { id } = decoded;
      const findUserByToken = await user.findById(id);
      resp.json(findUserByToken);
    } else {
      resp.json("Please Login Again");
    }
  } catch (error) {
    resp.json(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log("server is running");
});
