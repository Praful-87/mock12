const mongoose = require("mongoose");
const userScema = mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String },
    phone: { type: Number, unique: true },
    profilePic: { type: String },
  },
  {
    versionKey: false,
  }
);
const UserModel = mongoose.model("user", userScema);

module.exports = { UserModel };
