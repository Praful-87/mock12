const { Router } = require("express");
const { AdModel } = require("../models/Ad.model");

const ad = Router();

ad.get("/", async (req, res) => {
  try {
    let data = await AdModel.find();
    console.log(data);
    res.send("ads");
  } catch (err) {
    console.log(err);
    res.send("somthing went wrong");
  }
});
module.exports = { ad };
