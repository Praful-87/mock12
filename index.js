const express = require("express");
const { connection } = require("./config/db");
const app = express();
const cors = require("cors");
const { ad } = require("./routes/ad.route");

app.listen(8000, async () => {
  try {
    await connection;
    console.log("connected to db and listening on port 8000");
  } catch (er) {
    console.log("not connected to db");
    console.log(er);
  }
});
app.use(express.json());
app.use(cors());
app.use("/ad", ad);
app.get("/", (req, res) => {
  res.send("home page mock 12");
});
