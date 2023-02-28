const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { UserModel } = require("../models/User.model");

const login = Router();
login.post("/", async (req, res) => {
  const { email, password } = req.body;
  // res.send("testing login");
  try {
    let user = await UserModel.find({ email });
    // console.log(user);

    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (result) {
          let token = jwt.sign(
            { userId: user[0]._id },
            process.env.PRIVATE_KEY
          );
          // console.log(token);
          res
            .status(200)
            .send({
              msg: "login successfull",
              response: true,
              token: token,
              id: user[0]._id,
            });
        } else {
          // console.log(err);
          res.status(400).send({ msg: "Wrong credential", response: false });
        }
      });
    } else {
      res.status(400).send({
        msg: "Your are not registerd plese register fitst",
        response: false,
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "Something went wrong", response: false });
  }
});
module.exports = { login };
