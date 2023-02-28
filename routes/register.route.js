const { Router } = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/User.model");

require("dotenv").config();

const register = Router();

register.post("/", async (req, res) => {
  let { username, email, password, bio, phone } = req.body;
  // console.log(username, email, password);
  // res.send("tessing register")

  try {
    bcrypt.hash(password, 5, async (err, hash) => {
      try {
        await new UserModel({
          username,
          email,
          password: hash,
          bio,
          phone,
        }).save();
        res.status(200).send({ msg: "signup successfull", response: true });
      } catch (err) {
        console.log(err);
        res.status(404).send({
          msg: "Internal error or you are allready registed",
          response: false,
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(404).send({
      msg: "Internal error try again after some time",
      response: false,
    });
  }
});

module.exports = { register };
