const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
//Import Routes
const authRoute = require("./routes/auth");
// Cors import
const cors = require("cors");

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () =>
  console.log("Connected to DB!")
);

//Middleware
app.use(cors());
app.use(express.json());

//Route Middlewares
app.use("/api/v1", authRoute);

const port = process.env.PORT || 3006;
app.listen(port, console.log("Server Up and Running!"));
