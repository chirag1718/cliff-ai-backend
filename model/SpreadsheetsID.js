const mongoose = require("mongoose");

const sheetsSchema = new mongoose.Schema({
  spreadSheetId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GoogleSpreadSheetId", sheetsSchema);
