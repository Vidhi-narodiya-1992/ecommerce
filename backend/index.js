const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./db/Users.js");
const Product = require("./db/Products.js");
const Config = require("./db/config.js");
app.use(cors());
app.use(express.json());
//const port = process.env.port;

app.post("/register", async (req, res) => {
  console.log(req.body);
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();   
  delete result.password
  res.send(result);
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "No user found" });
    }
  }else
  {
    res.send({ result: "No user found" });
  }
});

app.post("/add-product", async(req, res)=>{
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length>0){
    res.send(products)
    console.log(products)
  }else{
    res.send({result:"No Products found"})
  }
})

app.listen(5002, () => {
  console.log("Server is running on port 5002");
});
