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
ad.post("/", async (req, res) => {
  let payload = req.body;
  try {
    console.log(payload);
    await new AdModel(payload).save();
    res.status(200).send("post data");
  } catch (err) {
    res.status(400).send("something went wrong");
    console.log(err);
  }
});
module.exports = { ad };
//status(200).
//status(400).