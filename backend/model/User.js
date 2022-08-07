const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  username:String,
  email: String,
  avatar: String,
  about:String,
  social:String,
  userRole:String,
  password:String,
}); 

module.exports = mongoose.model("User", userSchema);