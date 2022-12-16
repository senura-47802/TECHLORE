const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  admin: Boolean,
  Age: Number,
  quizcount: Number,
  points: Number,
  avatar: String,
})),
  (users = mongoose.model("user", userSchema));

module.exports = users;
