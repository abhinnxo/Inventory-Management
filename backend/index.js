require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const Category = require("./models/category.model");
const nodeMailer = require("nodemailer");

var url = "mongodb://localhost:27017/";

const MAIL = process.env.MAIL;
const PASS = process.env.PASS;
var OTP;

let mailTransport = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL,
    pass: PASS,
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

mongoose.connect(`${url}inventroy-management`);

// Routes
// Register new user
app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: "ERROR", error: "Duplicate Email" });
  }
});

// Login existing user
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });

  if (user) return res.json({ status: "OK", user: true });
  else return res.json({ status: "ERROR", user: false });
});

// Generate OTP
app.post("/api/generate-otp", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  OTP = Math.random().toString(36).substring(2, 8);

  if (user) {
    res.json({ status: "OK", user: true, otp: OTP });

    let details = {
      from: "abhinnk21@gmail.com",
      to: req.body.email,
      subject: "Reset Password",
      text: `Your secret code is: ${OTP}`,
    };

    mailTransport.sendMail(details, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
        console.log("OTP sent", OTP);
        res.send({ OTP: OTP });
      }
    });
  } else {
    res.json({ status: "ERROR", user: false });
  }
});

// Reset Password
app.post("/api/reset-password", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  console.log("line 96", req.body);

  if (user) {
    if (OTP === req.body.otp && req.body.newPass !== user.password) {
      console.log("line 100", OTP);
      res.json({ status: "OK", user: true });
      user.password = req.body.newPass;
      user.save();
    } else {
      res.json({ status: "ERROR", user: false });
    }
  } else {
    res.json({ status: "ERROR", user: false });
  }
});

// Create new Category
app.post("/api/create-category", async (req, res) => {
  try {
    await Category.create({
      name: req.body.data.name,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: "ERROR", error: "Duplicate Category" });
  }
});

//  Fetch all the existing categories
app.get("/api/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ status: "OK", categories: categories });
  } catch (error) {
    console.log(error);
  }
});

// Delete a category
app.delete("/api/delete-category", async (req, res) => {
  const data = req.body.name;

  console.log("data", data);

  try {
    await Category.deleteOne({ name: data });
    res.json({ status: "OK" });
  } catch (err) {
    console.log(err);
  }
});

// Update a category
app.put("/api/update-category", async (req, res) => {
  const data = req.body.data;

  const category = await Category.findOne({
    name: data.oldName,
  });

  if (category) {
    category.name = data.newName;
    category.save();
    res.json({ status: "OK" });
  } else {
    res.json({ status: "ERROR", error: "something wrong happened" });
  }
});

// add item
app.post("/api/add-item", async (req, res) => {
  try {
    await Item.create({
      name: req.body.data.name,
      category: req.body.data.category,
    });
    res.json({ status: "OK" });
  } catch (error) {
    res.json({ status: "ERROR", error: "Duplicate Item" });
  }
});

// Delete item
app.delete("/api/delete-item", async (req, res) => {
  try {
    await Category.deleteOne({
      name: req.body.name,
      category: req.body.category,
    });
    res.json({ status: "OK" });
  } catch (err) {
    console.log(err);
  }
});

//  Server Start
app.listen(1000, () => console.log("Server Started at PORT: 1000"));
