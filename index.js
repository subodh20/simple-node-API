const express = require("express");
const mongoose = require("mongoose");
const Product = require("./product.model.js");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This response is from node");
});
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body);
    if (!products)
      return res.status(404).json({ message: "Product not found" });
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
app.delete("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted suceessfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
mongoose
  .connect(
    "mongodb+srv://stiwari:Lod6yeB2kCZKhzHS@nodeapidb.ri4cjrh.mongodb.net/Node-API?retryWrites=true&w=majority&appName=nodeapiDB"
  )
  .then(() => {
    console.log("database is connected");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("could not connect to db");
  });
