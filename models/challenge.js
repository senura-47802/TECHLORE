const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(challengeSchema = new Schema({
  id: String,
  title: String,
  description: String,
  sdate: Date,
  edate: Date,
  link: String,
  num: String,
})),
  (Challenge = mongoose.model("challenge", challengeSchema));

module.exports = Challenge;
