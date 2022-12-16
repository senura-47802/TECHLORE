const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(blogSchema = new Schema({
  id: String,
  title: String,
  description: String,
  link: String,
  image_link: String,
  num: String,
})),
  (blogs = mongoose.model("blog", blogSchema));

module.exports = blogs;
