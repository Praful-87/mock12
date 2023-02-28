const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserModel } = require("./models/User.model");
const { login } = require("./routes/login.route");
const { register } = require("./routes/register.route");
const { profile } = require("./routes/profile.route");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Listeing on port", process.env.PORT);
  } catch (err) {
    console.log("could not connect");
  }
});
app.get("/", (req, res) => {
  
  res.send("mock 12 homepage");
});
app.use("/login", login);
app.use("/register", register);
app.use("/getProfile", profile);
