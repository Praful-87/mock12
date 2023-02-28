const { Router } = require("express");
const { UserModel } = require("../models/User.model");

const profile = Router();
profile.get("/:id", async (req, res) => {
  let { id } = req.params;
  // console.log(id);
  try {
    let user = await UserModel.find({ _id: id });

    // console.log(user);
    res.send(user);
  } catch (err) {
    res.send("error");
  }
});
profile.post("/edit/:id", async (req, res) => {
  let { id } = req.params;
  let payload = req.body;
  console.log(payload);
  console.log(id);
  try {
    res.send("edit");
  } catch (err) {
    res.send("error");
  }
});
module.exports = { profile };
