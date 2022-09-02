const router = require("express").Router();
// JSON web token import
const jwt = require("jsonwebtoken");
// User Schema import
const User = require("../model/User");

// bycrpt import
const bcrypt = require("bcryptjs");
// Validation import
const { registerValidation, loginValidation } = require("../userValidation");
const GoogleSpreadSheetId = require("../model/SpreadsheetsID");
// Private routes verification
// const verify = require("./privateRoutes")
// use verify with dashboard and other things

// Register User
router.post("/signup", async (req, res) => {
  // Validate user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Check if the user is already in the database
  const emailExist = await User.findOne({
    email: req.body.email,
  });
  if (emailExist) return res.status(400).send("Email already exists");

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login User
router.post("/login", async (req, res) => {
  console.log(req.body);
  // Vlaidate user
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  // Checking if the email already exists in the database
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) return res.status(400).send("User not found!");

  // If password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid password");

  // Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
});

// User Subscription

// router.get("/subscriptions", (req, res) => {

// });
router.post("/subscriptions", async (req, res) => {
  const googleSpreadSheetId = new GoogleSpreadSheetId({
    spreadSheetId: req.body.spreadSheetId,
  });
  try {
    const savedSpreadSheetId = await googleSpreadSheetId.save();
    res.send({ googleSpreadSheetId: googleSpreadSheetId.spreadSheetId });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
