const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(learnSchema = new Schema({
  id: String,
  title: String,
  description: String,
  guide: String,
  setup: String,
  image_link: String,
  num: String,
})),
  (learns = mongoose.model("learn", learnSchema));

module.exports = learns;
