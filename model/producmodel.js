const mongoose = require("mongoose");

const productschema = mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  discountprice: {
    type: Number,
    require: true,
  },
  actualprice: {
    type: Number,
  },
  color: {
    type: Array,
  },
  Categories: {
    type: String,
    require: true,
  },
});

const product = mongoose.model("Product", productschema);

module.exports = product;
