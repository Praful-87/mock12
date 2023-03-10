const { Router } = require("express");
const { AdModel } = require("../models/Ad.model");

const ad = Router();

ad.get("/", async (req, res) => {
  let { page } = req.query;
  let { limit } = req.query;
  let { filter } = req.query;
  let { sort } = req.query;
  // console.log(page);
  if (!page) page = 0;
  if (!limit) limit = 4;
  
  let skip = limit * page - limit;
  if (skip < 0) skip = 0;
  // console.log(page, limit,page*limit);
  // res.send("ok");
  try {
    let data;
    if (filter && sort) {
      data = await AdModel.find()
        .skip(skip)
        .limit(limit);
    } else if (filter) {
      data = await AdModel.find({ category: filter })
        .skip(skip)
        .limit(limit);
    } else {
      data = await AdModel.find()
        .skip(skip)
        .limit(limit);
    }
    // console.log(data);
    res.status(200).send(data);
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
ad.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    // console.log(id);
    await AdModel.deleteOne({ _id: id });
    res.send("Deleted");
  } catch (err) {
    res.status(400).send("something went wrong");
    console.log(err);
  }
});
module.exports = { ad };
