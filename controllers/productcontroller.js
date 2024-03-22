const product = require("../model/producmodel");

// Function that post product to database
const postproduct = async (req, resp) => {
  const {
    image,
    name,
    description,
    rating,
    discountprice,
    actualprice,
    color,
    Categories,
  } = req.body;

  const data = new product({
    image,
    name,
    description,
    rating,
    discountprice,
    actualprice,
    color,
    Categories,
  });

  saveproduct = await data.save();

  if (saveproduct) {
    resp.json("added Successfull");
  } else resp.status(404).json("Error");
};

// Function that get product from database
const getproduct = async (req, resp) => {
  const productdata = await product.find();

  if (productdata) {
    resp.json(productdata);
  } else resp.status(404).json("Error");
};

// export multiple functions
module.exports = { postproduct, getproduct };
