const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(newsSchema = new Schema({
  id: String,
  title: String,
  description: String,
  date: Date,
  link: String,
  image_link: String,
  num: String,
})),
  (News = mongoose.model("news", newsSchema));

module.exports = News;
