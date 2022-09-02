const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
});

const sheetsSchema = new mongoose.Schema({
  spreadSheetId: {
    type: String,
    required: true,
  }
})
module.exports = mongoose.model("User", userSchema);

