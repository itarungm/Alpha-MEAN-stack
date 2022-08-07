const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: String,
  desc: String,
  author: String,
  category:String,
  created_at: Date,
  avatar: String,
  token:String
});

module.exports = mongoose.model("Post", postSchema);