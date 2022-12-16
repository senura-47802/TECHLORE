const mongoose = require("mongoose");
const Schema = mongoose.Schema;

(analyticSchema = new Schema({
  logins: Number,
  Views: Number,
  
})),
  (analytics = mongoose.model("analytic", analyticSchema));

module.exports = analytics;
